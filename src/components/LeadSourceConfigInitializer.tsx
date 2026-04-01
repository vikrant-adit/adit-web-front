"use client";

import { useEffect } from "react";
import { getLeadSourceConfigCached } from "@/lib/LeadControll/leadSourceConfig";

export default function LeadSourceConfigInitializer() {
  useEffect(() => {
    getLeadSourceConfigCached()
      .then((cfg) => {
        console.log("✅ Lead source config loaded:", cfg);
      })
      .catch(() => {});
  }, []);

  return null;
}
