import { UiAction } from "@/types/submit";

export function handleUiAction(action?: UiAction) {
  if (!action) return;

  switch (action.action) {
    case "toast":
      alert(action.message); // replace with your toast lib
      break;

    case "redirect":
      globalThis.location.href = action.url;
      break;

    case "none":
    default:
      break;
  }
}
