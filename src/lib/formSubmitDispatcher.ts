/* eslint-disable @typescript-eslint/no-explicit-any */
import { SubmitConfig } from "@/types/submit";

export async function submitForm(
  config: SubmitConfig,
  data: Record<string, any>
) {
  if(config.type=="api"){
    return submitViaApi(config, data);
  }else{
    throw new Error("Unsupported submit type");
  }

}

async function submitViaApi(
  config: Extract<SubmitConfig, { type: "api" }>,
  data: Record<string, any>
) {
  const res = await fetch(config.endpoint, {
    method: config.method,
    headers: {
      "Content-Type": "application/json",
      ...config.headers,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("API submission failed");
  }

  return res.json();
}
