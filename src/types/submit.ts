export type SubmitActionType = "api";

export type UiAction =
  | { action: "toast"; message: string }
  | { action: "redirect"; url: string }
  | { action: "none" };

export interface ApiSubmitConfig {
  type: "api";
  method: "POST" | "PUT" | "PATCH";
  endpoint: string;
  headers?: Record<string, string>;
  onSuccess?: UiAction;
  onError?: UiAction;
}

export type SubmitConfig = ApiSubmitConfig;
