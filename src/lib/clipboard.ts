import { toast } from "sonner";

export function writeToClipboard(text: string) {
  toast.info("Copied");
  return navigator.clipboard.writeText(text);
}
