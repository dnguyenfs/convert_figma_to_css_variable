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
    mode1: z.object({
      typographyFontFamily: z.string(),
      typographyFontWeightRegular: z.string(),
      typographyFontWeightMedium: z.string(),
    }),
  }),
  colorSet: z.object({
    mode1: z.object({
      primary50: z.string(),
      primary100: z.string(),
      primary200: z.string(),
      primary300: z.string(),
      primary400: z.string(),
      primary500: z.string(),
      primary600: z.string(),
      primary700: z.string(),
      primary800: z.string(),
      primary900: z.string(),
      primary950: z.string(),
      error50: z.string(),
      error100: z.string(),
      error200: z.string(),
      error300: z.string(),
      error400: z.string(),
      error500: z.string(),
      error600: z.string(),
      error700: z.string(),
      error800: z.string(),
      error900: z.string(),
      error950: z.string(),
      warning50: z.string(),
      warning100: z.string(),
      warning200: z.string(),
      warning300: z.string(),
      warning400: z.string(),
      warning500: z.string(),
      warning600: z.string(),
      warning700: z.string(),
      warning800: z.string(),
      warning900: z.string(),
      warning950: z.string(),
      success50: z.string(),
      success100: z.string(),
      success200: z.string(),
      success300: z.string(),
      success400: z.string(),
      success500: z.string(),
      success600: z.string(),
      success700: z.string(),
      success800: z.string(),
      success900: z.string(),
      success950: z.string(),
      neutral50: z.string(),
      neutral100: z.string(),
      neutral200: z.string(),
      neutral300: z.string(),
      neutral400: z.string(),
      neutral500: z.string(),
      neutral600: z.string(),
      neutral700: z.string(),
      neutral800: z.string(),
      neutral900: z.string(),
      neutral950: z.string(),
      white100: z.string(),
      white90: z.string(),
      white80: z.string(),
      white70: z.string(),
      white60: z.string(),
      white50: z.string(),
      white40: z.string(),
      white30: z.string(),
      white20: z.string(),
      white10: z.string(),
      black100: z.string(),
      black90: z.string(),
      black80: z.string(),
      black70: z.string(),
      black60: z.string(),
      black50: z.string(),
      black40: z.string(),
      black30: z.string(),
      black20: z.string(),
      black10: z.string(),
      info50: z.string(),
      info100: z.string(),
      info200: z.string(),
      info300: z.string(),
      info400: z.string(),
      info500: z.string(),
      info600: z.string(),
      info700: z.string(),
      info800: z.string(),
      info900: z.string(),
      info950: z.string(),
      crusta50: z.string(),
      crusta100: z.string(),
      crusta200: z.string(),
      crusta300: z.string(),
      crusta400: z.string(),
      crusta500: z.string(),
      crusta600: z.string(),
      crusta700: z.string(),
      crusta800: z.string(),
      crusta900: z.string(),
      crusta950: z.string(),
      matisse50: z.string(),
      matisse100: z.string(),
      matisse200: z.string(),
      matisse300: z.string(),
      matisse400: z.string(),
      matisse500: z.string(),
      matisse600: z.string(),
      matisse700: z.string(),
      matisse800: z.string(),
      matisse900: z.string(),
      matisse950: z.string(),
      wildBlueYonder50: z.string(),
      wildBlueYonder100: z.string(),
      wildBlueYonder200: z.string(),
      wildBlueYonder300: z.string(),
      wildBlueYonder400: z.string(),
      wildBlueYonder500: z.string(),
      wildBlueYonder600: z.string(),
      wildBlueYonder700: z.string(),
      wildBlueYonder800: z.string(),
      wildBlueYonder900: z.string(),
      wildBlueYonder950: z.string(),
      shamrock50: z.string(),
      shamrock100: z.string(),
      shamrock200: z.string(),
      shamrock300: z.string(),
      shamrock400: z.string(),
      shamrock500: z.string(),
      shamrock600: z.string(),
      shamrock700: z.string(),
      shamrock800: z.string(),
      shamrock900: z.string(),
      shamrock950: z.string(),
      frenchRose50: z.string(),
      frenchRose100: z.string(),
      frenchRose200: z.string(),
      frenchRose300: z.string(),
      frenchRose400: z.string(),
      frenchRose500: z.string(),
      frenchRose600: z.string(),
      frenchRose700: z.string(),
      frenchRose800: z.string(),
      frenchRose900: z.string(),
      frenchRose950: z.string(),
      blueMarguerite50: z.string(),
      blueMarguerite100: z.string(),
      blueMarguerite200: z.string(),
      blueMarguerite300: z.string(),
      blueMarguerite400: z.string(),
      blueMarguerite500: z.string(),
      blueMarguerite600: z.string(),
      blueMarguerite700: z.string(),
      blueMarguerite800: z.string(),
      blueMarguerite900: z.string(),
      blueMarguerite950: z.string(),
      viking50: z.string(),
      viking100: z.string(),
      viking200: z.string(),
      viking300: z.string(),
      viking400: z.string(),
      viking500: z.string(),
      viking600: z.string(),
      viking700: z.string(),
      viking800: z.string(),
      viking900: z.string(),
      viking950: z.string(),
      mandy50: z.string(),
      mandy100: z.string(),
      mandy200: z.string(),
      mandy300: z.string(),
      mandy400: z.string(),
      mandy500: z.string(),
      mandy600: z.string(),
      mandy700: z.string(),
      mandy800: z.string(),
      mandy900: z.string(),
      mandy950: z.string(),
      neutral150: z.string(),
      neutral250: z.string(),
      neutral350: z.string(),
      neutral450: z.string(),
      neutral550: z.string(),
      neutral650: z.string(),
      neutral750: z.string(),
      neutral850: z.string(),
    }),
  }),
  colorTokens: z.object({
    light: z.object({
      textPrimary: z.string(),
      textSecondary: z.string(),
      textDisable: z.string(),
      strokeDivider: z.string(),
      strokeBorder: z.string(),
      textPlaceholder: z.string(),
      bGFieldDefault: z.string(),
      bGPageLevel01: z.string(),
      textSuccess: z.string(),
      bGSuccessDefault: z.string(),
      bGWarningDefault: z.string(),
      bGErrorDefault: z.string(),
      bGInfoDefault: z.string(),
      textError: z.string(),
      textWarning: z.string(),
      bGPageLayer02: z.string(),
      bGFieldDisable: z.string(),
      iconDefault: z.string(),
      textInfo: z.string(),
      bGPrimaryDefault: z.string(),
      textOnColor: z.string(),
      strokeActiveFocus: z.string(),
      iconSuccess: z.string(),
      iconError: z.string(),
      iconWarning: z.string(),
      strokeDisable: z.string(),
      strokeSuccess: z.string(),
      strokeWarning: z.string(),
      strokeError: z.string(),
      strokeInfo: z.string(),
      bGPageLayer03: z.string(),
      iconActive: z.string(),
      iconOnColor: z.string(),
      bGPrimaryHover: z.string(),
      bGPrimaryPress: z.string(),
      bGInfoHover: z.string(),
      bGInfoPress: z.string(),
      bGSuccessHover: z.string(),
      bGSuccessPress: z.string(),
      bGWarningHover: z.string(),
      bGWarningPress: z.string(),
      bGErrorHover: z.string(),
      bGErrorPress: z.string(),
      bGLightLavenderDefault: z.string(),
      bGLightLavenderHover: z.string(),
      bGLightLavenderPress: z.string(),
      bGCrustaDefault: z.string(),
      bGCrustaHover: z.string(),
      bGCrustaPress: z.string(),
      bGMatisseDefault: z.string(),
      bGMatisseHover: z.string(),
      bGMatissePress: z.string(),
      bGWildBlueYonderDefault: z.string(),
      bGWildBlueYonderHover: z.string(),
      bGWildBlueYonderPress: z.string(),
      bGShamrockDefault: z.string(),
      bGShamrockHover: z.string(),
      bGShamrockPress: z.string(),
      bGFrenchRoseDefault: z.string(),
      bGFrenchRoseHover: z.string(),
      bGFrenchRosePress: z.string(),
      bGBlueMargueriteDefault: z.string(),
      bGBlueMargueriteHover: z.string(),
      bGBlueMargueritePress: z.string(),
      bGVikingDefault: z.string(),
      bGVikingHover: z.string(),
      bGVikingPress: z.string(),
      bGMandyDefault: z.string(),
      bGMandyHover: z.string(),
      bGMandyPress: z.string(),
      strokeCrusta: z.string(),
      strokeMatisse: z.string(),
      strokeWildBlueYonder: z.string(),
      strokeShamrock: z.string(),
      strokeFrenchRose: z.string(),
      strokeBlueMarguerite: z.string(),
      textActiveLink: z.string(),
      iconDisabled: z.string(),
      iconInfo: z.string(),
      bGFieldHover: z.string(),
      bGFieldPress: z.string(),
      strokeViking: z.string(),
      strokeMandy: z.string(),
      fGNeutral: z.string(),
      highlightGeneralHighlight: z.string(),
      highlightPinkHighlight: z.string(),
      highlightAddiingHighight: z.string(),
      highlightRemovingHighlight: z.string(),
      bGPageLayer04: z.string(),
      textContrast: z.string(),
      strokeForbidden: z.string(),
      iconPattern: z.string(),
    }),
    dark: z.object({
      textPrimary: z.string(),
      textSecondary: z.string(),
      textDisable: z.string(),
      strokeDivider: z.string(),
      strokeBorder: z.string(),
      textPlaceholder: z.string(),
      bGFieldDefault: z.string(),
      bGPageLevel01: z.string(),
      textSuccess: z.string(),
      bGSuccessDefault: z.string(),
      bGWarningDefault: z.string(),
      bGErrorDefault: z.string(),
      bGInfoDefault: z.string(),
      textError: z.string(),
      textWarning: z.string(),
      bGPageLayer02: z.string(),
      bGFieldDisable: z.string(),
      iconDefault: z.string(),
      textInfo: z.string(),
      bGPrimaryDefault: z.string(),
      textOnColor: z.string(),
      strokeActiveFocus: z.string(),
      iconSuccess: z.string(),
      iconError: z.string(),
      iconWarning: z.string(),
      strokeDisable: z.string(),
      strokeSuccess: z.string(),
      strokeWarning: z.string(),
      strokeError: z.string(),
      strokeInfo: z.string(),
      bGPageLayer03: z.string(),
      iconActive: z.string(),
      iconOnColor: z.string(),
      bGPrimaryHover: z.string(),
      bGPrimaryPress: z.string(),
      bGInfoHover: z.string(),
      bGInfoPress: z.string(),
      bGSuccessHover: z.string(),
      bGSuccessPress: z.string(),
      bGWarningHover: z.string(),
      bGWarningPress: z.string(),
      bGErrorHover: z.string(),
      bGErrorPress: z.string(),
      bGLightLavenderDefault: z.string(),
      bGLightLavenderHover: z.string(),
      bGLightLavenderPress: z.string(),
      bGCrustaDefault: z.string(),
      bGCrustaHover: z.string(),
      bGCrustaPress: z.string(),
      bGMatisseDefault: z.string(),
      bGMatisseHover: z.string(),
      bGMatissePress: z.string(),
      bGWildBlueYonderDefault: z.string(),
      bGWildBlueYonderHover: z.string(),
      bGWildBlueYonderPress: z.string(),
      bGShamrockDefault: z.string(),
      bGShamrockHover: z.string(),
      bGShamrockPress: z.string(),
      bGFrenchRoseDefault: z.string(),
      bGFrenchRoseHover: z.string(),
      bGFrenchRosePress: z.string(),
      bGBlueMargueriteDefault: z.string(),
      bGBlueMargueriteHover: z.string(),
      bGBlueMargueritePress: z.string(),
      bGVikingDefault: z.string(),
      bGVikingHover: z.string(),
      bGVikingPress: z.string(),
      bGMandyDefault: z.string(),
      bGMandyHover: z.string(),
      bGMandyPress: z.string(),
      strokeCrusta: z.string(),
      strokeMatisse: z.string(),
      strokeWildBlueYonder: z.string(),
      strokeShamrock: z.string(),
      strokeFrenchRose: z.string(),
      strokeBlueMarguerite: z.string(),
      textActiveLink: z.string(),
      iconDisabled: z.string(),
      iconInfo: z.string(),
      bGFieldHover: z.string(),
      bGFieldPress: z.string(),
      strokeViking: z.string(),
      strokeMandy: z.string(),
      fGNeutral: z.string(),
      highlightGeneralHighlight: z.string(),
      highlightPinkHighlight: z.string(),
      highlightAddiingHighight: z.string(),
      highlightRemovingHighlight: z.string(),
      bGPageLayer04: z.string(),
      textContrast: z.string(),
      strokeForbidden: z.string(),
      iconPattern: z.string(),
    }),
  }),
  brandColors: z.object({
    mode1: z.object({
      logoCerise: z.string(),
      logoFuchsiaBlue: z.string(),
      logoPictonBlue: z.string(),
      logoSun: z.string(),
    }),
  }),
  distanceAndRadius: z.object({
    mode1: z.object({
      paddingAndSpacingXxs: z.number(),
      paddingAndSpacingS: z.number(),
      paddingAndSpacingM: z.number(),
      paddingAndSpacingL: z.number(),
      paddingAndSpacingXl: z.number(),
      paddingAndSpacingXxl: z.number(),
      paddingAndSpacingXxxl: z.number(),
      paddingAndSpacingXs: z.number(),
      radius: z.number(),
    }),
  }),
  conversion: z.object({
    mac: z.object({ control: z.string() }),
    window: z.object({ control: z.string() }),
  }),
});

export type DesignSystem = z.infer<typeof DesignSystemSchema>;

type ConvertSystemData = {
  variableMapString: string;
  darkVariableMapString: string;
  lightVariableMapString: string;
};

function formatKey(key: string): string {
  // First replace bG and fG with bg and fg
  // Then add dash before uppercase letters and numbers
  // Example: bGFieldDefault -> bg-field-default, bGFieldDefault50 -> bg-field-default-50
  return key
    .replace(/bG/g, "bg")
    .replace(/fG/g, "fg")
    .replace(/([a-z])([A-Z])/g, "$1-$2") // lowercase followed by uppercase
    .replace(/([a-zA-Z])(\d)/g, "$1-$2") // letter followed by number
    .toLowerCase();
}


const convertDesignSystemHexToHSL = (
  object: DesignSystem
): ConvertSystemData => {
  const variableNameHslMap = new Map<string, string>();
  const variableHexVariable = new Map<string, string>();

  const variableTokenLightMap = new Map<string, string>();
  const variableTokenDarkMap = new Map<string, string>();

  const colorVariableWithColorSetMap = new Map<string, string>();

  const colorSet = object["colorSet"].mode1;
  const colorTokens = object["colorTokens"];
  const colorSetKeys = Object.keys(colorSet);

  for (const key of colorSetKeys) {
    const value = colorSet[key as keyof typeof colorSet];

    if (value) {
      const hsl = convertHexToHSL(value);
      const formattedKey = formatKey(key);
      const newKey = `--color-${formattedKey}`;
      variableNameHslMap.set(newKey, `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`);
      variableHexVariable.set(value, newKey);
    }
  }

  const light = colorTokens?.light;
  const dark = colorTokens?.dark;

  if (light) {
    for (const key of Object.keys(light)) {
      const hex = light[key as keyof typeof light];
      const replacedKey = formatKey(key);

      const tokenSetKey = `--${replacedKey}`;
      variableTokenLightMap.set(
        tokenSetKey,
        `var(${variableHexVariable.get(hex) || ""})`
      );

      colorVariableWithColorSetMap.set(
        `--color-${replacedKey}`,
        `var(${tokenSetKey})`
      );
    }
  }

  if (dark) {
    for (const key of Object.keys(dark)) {
      const hex = dark[key as keyof typeof dark];
      const replacedKey = formatKey(key);
      const tokenSetKey = `--${replacedKey}`;
      variableTokenDarkMap.set(
        tokenSetKey,
        `var(${variableHexVariable.get(hex) || ""})`
      );
      colorVariableWithColorSetMap.set(
        `--color-${replacedKey}`,
        `var(${tokenSetKey})`
      );
    }
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
          console.log("result", result.data);
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
                <p className="text-primary-foreground text-sm">@theme inline</p>
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
                <pre className="text-sm">{convertedData.variableMapString}</pre>
              </ScrollArea>
            </div>
          )}

          {convertedData.lightVariableMapString && (
            <div className="flex flex-col rounded-lg overflow-hidden">
              <div className="p-2 bg-primary flex items-center justify-between">
                <p className="text-primary-foreground text-sm">:root</p>
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
                <pre className="text-sm">
                  {convertedData.lightVariableMapString}
                </pre>
              </ScrollArea>
            </div>
          )}

          {convertedData.darkVariableMapString && (
            <div className="flex flex-col rounded-lg overflow-hidden">
              <div className="p-2 bg-primary flex items-center justify-between">
                <p className="text-primary-foreground text-sm">.dark</p>
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
                <pre className="text-sm">
                  {convertedData.darkVariableMapString}
                </pre>
              </ScrollArea>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
