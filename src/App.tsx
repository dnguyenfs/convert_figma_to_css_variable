import z, { ZodError } from "zod";
import FileUploadCompact from "./components/file-upload/compact-upload";
import type { FileWithPreview } from "./hooks/use-file-upload";
import { useState } from "react";
import { JSONTree } from "react-json-tree";
import convert, { type HSL } from "color-convert";
import { CopyIcon } from "lucide-react";
import { Separator } from "./components/ui/separator";
import { ScrollArea } from "./components/ui/scroll-area";
import { Button } from "./components/ui/button";
import { writeToClipboard } from "./lib/clipboard";

export const DesignSystemSchema = z.object({
  typo: z.object({
    "typography-font-family": z.object({ "mode-1": z.string() }),
    "typography-font-weight-regular": z.object({ "mode-1": z.string() }),
    "typography-font-weight-medium": z.object({ "mode-1": z.string() }),
  }),
  "color-set": z.record(z.string(), z.object({ "mode-1": z.string() })),
  "color-tokens": z.record(
    z.string(),
    z.object({ light: z.string(), dark: z.string() })
  ),
  "brand-colors": z.object({
    "logo-cerise": z.object({ "mode-1": z.string() }),
    "logo-fuchsia-blue": z.object({ "mode-1": z.string() }),
    "logo-picton-blue": z.object({ "mode-1": z.string() }),
    "logo-sun": z.object({ "mode-1": z.string() }),
  }),
  "distance-and-radius": z.object({
    "padding-and-spacing-xxs": z.object({ "mode-1": z.number() }),
    "padding-and-spacing-s": z.object({ "mode-1": z.number() }),
    "padding-and-spacing-m": z.object({ "mode-1": z.number() }),
    "padding-and-spacing-l": z.object({ "mode-1": z.number() }),
    "padding-and-spacing-xl": z.object({ "mode-1": z.number() }),
    "padding-and-spacing-xxl": z.object({ "mode-1": z.number() }),
    "padding-and-spacing-xxxl": z.object({ "mode-1": z.number() }),
    "padding-and-spacing-xs": z.object({ "mode-1": z.number() }),
    radius: z.object({ "mode-1": z.number() }),
  }),
  conversion: z.object({
    control: z.object({ mac: z.string(), window: z.string() }),
  }),
});

export type DesignSystem = z.infer<typeof DesignSystemSchema>;

type ConvertSystemData = {
  variableMapString: string;
  darkVariableMapString: string;
  lightVariableMapString: string;
};

const convertDesignSystemHexToHSL = (
  object: DesignSystem
): ConvertSystemData => {
  const variableNameHslMap = new Map<string, string>();
  const variableHexVariable = new Map<string, string>();

  const variableTokenLightMap = new Map<string, string>();
  const variableTokenDarkMap = new Map<string, string>();

  const colorVariableWithColorSetMap = new Map<string, string>();

  const colorSet = object["color-set"];
  const colorTokens = object["color-tokens"];
  const colorSetKeys = Object.keys(colorSet);

  for (const key of colorSetKeys) {
    const value = colorSet[key]?.["mode-1"];
    if (value) {
      const hsl = convertHexToHSL(value);
      const newKey = `--color-${key}`;
      variableNameHslMap.set(newKey, `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`);
      variableHexVariable.set(value, newKey);
    }
  }

  const colorTokenKeys = Object.keys(colorTokens);
  //generate tokenSets
  for (const key of colorTokenKeys) {
    const value = colorTokens[key];
    const light = value?.light;
    const dark = value?.dark;

    const replacedKey = `${key}`.replace(/b-g/g, "bg").replace(/f-g/g, "fg");
    const tokenSetKey = `--${replacedKey}`;

    if (light) {
      variableTokenLightMap.set(
        tokenSetKey,
        `var(${variableHexVariable.get(light) || ""})`
      );
    }

    if (dark) {
      variableTokenDarkMap.set(
        tokenSetKey,
        `var(${variableHexVariable.get(dark) || ""})`
      );
    }

    colorVariableWithColorSetMap.set(
      `--color-${replacedKey}`,
      `var(${tokenSetKey})`
    );
  }

  //convert variableMap to .txt file using bun
  let variableMapString = Array.from(variableNameHslMap.entries())
    .map(([key, value]) => `${key}: ${value}`)
    .join(";\n");

  variableMapString += "\n\n/* Color Variable With Color Set */\n\n";
  variableMapString += Array.from(colorVariableWithColorSetMap.entries())
    .map(([key, value]) => `${key}: ${value}`)
    .join(";\n");

  let lightVariableMapString = "/* Token Sets Light */\n\n";
  lightVariableMapString += Array.from(variableTokenLightMap.entries())
    .map(([key, value]) => `${key}: ${value}`)
    .join(";\n");

  let darkVariableMapString = "/* Token Sets Dark */\n\n";
  darkVariableMapString += Array.from(variableTokenDarkMap.entries())
    .map(([key, value]) => `${key}: ${value}`)
    .join(";\n");

  return {
    variableMapString,
    darkVariableMapString,
    lightVariableMapString,
  };
};

function convertHexToHSL(value: string): HSL {
  return convert.hex.hsl(value);
}

function App() {
  const [error, setError] = useState<ZodError>();
  const [convertedData, setConvertedData] = useState<ConvertSystemData>();

  const handleOnChange = (files: FileWithPreview[]) => {
    const fileWithPreview = files?.[0];
    if (!fileWithPreview) return;

    // Only proceed if fileWithPreview.file is a real File (not FileMetadata)
    if (!(fileWithPreview.file instanceof File)) {
      alert("Uploaded file is not a valid File object.");
      return;
    }
    setError(undefined);
    setConvertedData(undefined);
    const realFile = fileWithPreview.file;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        const result = DesignSystemSchema.safeParse(json);
        if (result.success) {
          const convertedData = convertDesignSystemHexToHSL(result.data);
          setConvertedData(convertedData);
          // You can set state or do further processing here
        } else {
          setError(result.error);
        }
      } catch (err) {
        console.error("Failed to parse JSON:", err);
        alert("Failed to parse JSON file.");
      }
    };
    reader.readAsText(realFile);
  };

  return (
    <div className="flex h-screen items-center flex-col py-[50px] gap-8 max-w-xl mx-auto">
      <div className="flex flex-col gap-2 w-full">
        <p className="">Upload your JSON file</p>
        <FileUploadCompact
          onFilesChange={handleOnChange}
          multiple={false}
          maxFiles={1}
          accept=".json"
          hasError={!!error}
        />
      </div>
      {error && (
        <div className="w-full h-auto flex flex-col gap-2 bg-accent rounded-lg p-4">
          <p className="text-sm">Error detail</p>
          <JSONTree data={error.issues} />
        </div>
      )}

      {convertedData && (
        <div className="w-full h-auto flex flex-col gap-8 bg-accent rounded-lg p-4">
          {convertedData.variableMapString && (
            <div className="flex flex-col rounded-lg overflow-hidden">
              <div className="p-2 bg-primary flex items-center justify-between">
                <p className="text-primary-foreground">@theme inline</p>
                <Button
                  size={"icon"}
                  onClick={() =>
                    writeToClipboard(convertedData.variableMapString)
                  }
                  variant={"outline"}
                >
                  <CopyIcon className="size-4" />
                </Button>
              </div>
              <Separator />
              <ScrollArea className="p-2 bg-background max-h-[400px]">
                <pre>{convertedData.variableMapString}</pre>
              </ScrollArea>
            </div>
          )}

          {convertedData.lightVariableMapString && (
            <div className="flex flex-col rounded-lg overflow-hidden">
              <div className="p-2 bg-primary flex items-center justify-between">
                <p className="text-primary-foreground">:root</p>
                <Button
                  size={"icon"}
                  onClick={() =>
                    writeToClipboard(convertedData.lightVariableMapString)
                  }
                  variant={"outline"}
                >
                  <CopyIcon className="size-4" />
                </Button>
              </div>
              <Separator />
              <ScrollArea className="p-2 bg-background max-h-[400px]">
                <pre>{convertedData.lightVariableMapString}</pre>
              </ScrollArea>
            </div>
          )}

          {convertedData.darkVariableMapString && (
            <div className="flex flex-col rounded-lg overflow-hidden">
              <div className="p-2 bg-primary flex items-center justify-between">
                <p className="text-primary-foreground">.dark</p>
                <Button
                  size={"icon"}
                  onClick={() =>
                    writeToClipboard(convertedData.darkVariableMapString)
                  }
                  variant={"outline"}
                >
                  <CopyIcon className="size-4" />
                </Button>
              </div>
              <Separator />
              <ScrollArea className="p-2 bg-background max-h-[400px]">
                <pre>{convertedData.darkVariableMapString}</pre>
              </ScrollArea>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
