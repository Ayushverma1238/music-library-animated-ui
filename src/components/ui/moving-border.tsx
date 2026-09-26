"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

type ButtonProps = {
  borderRadius?: string;
  children: React.ReactNode;
  as?: React.ElementType;
  containerClassName?: string;
  borderClassName?: string;
  duration?: number;
  className?: string;
  [key: string]: unknown;
};

export function Button({
  borderRadius = "1.75rem",
  children,
  as: Component = "button",
  containerClassName,
  borderClassName,
  duration = 1,
  className,
  ...otherProps
}: ButtonProps) {
  return (
    <Component
      className={cn(
        "relative h-16 w-40 overflow-hidden bg-transparent p-px",
        containerClassName
      )}
      style={{
        borderRadius,
      }}
      {...otherProps}
    >
      {/* Rotating border */}
      <motion.div
        className={cn(
          "absolute -inset-full",
          "bg-[conic-gradient(from_0deg,transparent_0deg,var(--border-color)_90deg,transparent_180deg)]",
          borderClassName
        )}
        style={
          {
            "--border-color": "#0ea5e9",
          } as React.CSSProperties
        }
        animate={{
          rotate: 360,
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Button background */}
      <div
        className={cn(
          "relative z-10 flex h-full w-full items-center justify-center",
          "border border-slate-800",
          "bg-slate-950",
          "text-sm text-white",
          "backdrop-blur-xl",
          className
        )}
        style={{
          borderRadius: `calc(${borderRadius} * 0.96)`,
        }}
      >
        {children}
      </div>
    </Component>
  );
}