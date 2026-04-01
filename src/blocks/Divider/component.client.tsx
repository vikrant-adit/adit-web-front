"use client";
import React from "react";
import { useEditorGlow } from "@/hooks/useEditorGlow";

export interface DividerProps {
  color?: string;
  thickness?: number;
  width?: string;
  positionVertical?: "top" | "center" | "bottom";
  positionHorizontal?: "left" | "center" | "right";
  styleType?: "solid" | "dashed" | "dotted";
  marginTop?: number;
  marginBottom?: number;

  paddingTop?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;

  label?: string;
  labelColor?: string;
  labelSize?: number;
  labelGap?: number;
  isGlobal?: boolean;
  globalKey?: string;
}

const Divider: React.FC<DividerProps> = ({
  color = "#e5e7eb",
  thickness = 1,
  width = "100%",
  positionVertical = "center",
  positionHorizontal = "center",
  styleType = "solid",
  marginTop = 20,
  marginBottom = 20,

  paddingTop = 0,
  paddingBottom = 0,
  paddingLeft = 0,
  paddingRight = 0,

  label = "",
  labelColor = "#374151",
  labelSize = 14,
  labelGap = 8,
  isGlobal,
}) => {
  const { shouldGlow } = useEditorGlow(isGlobal);

  const alignItems =
    positionVertical === "top"
      ? "flex-start"
      : positionVertical === "bottom"
        ? "flex-end"
        : "center";

  const justifyContent =
    positionHorizontal === "left"
      ? "flex-start"
      : positionHorizontal === "right"
        ? "flex-end"
        : "center";

  const hasLabel = typeof label === "string" && label.trim().length > 0;

  return (
    <div className={shouldGlow ? "editor-global-glow" : ""}>
     <div
  className="divider-block flex w-full"
  style={{
    justifyContent,
    alignItems,
    marginTop,
    marginBottom,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
  }}
>
        {hasLabel ? (
          <div
            className="flex items-center w-full"
            style={{
              width,
              gap: labelGap,
            }}
          >
            <div
              className="flex-1"
              style={{
                borderBottom: `${thickness}px ${styleType} ${color}`,
              }}
            />
            <span
              className="divider-label whitespace-nowrap"
              style={{
                color: labelColor,
                fontSize: labelSize,
              }}
            >
              {label}
            </span>
            <div
              className="flex-1"
              style={{
                borderBottom: `${thickness}px ${styleType} ${color}`,
              }}
            />
          </div>
        ) : (
          <div
            className="divider-line"
            style={{
              width: "100px",
              borderBottom: `${thickness}px ${styleType} ${color}`,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Divider;
