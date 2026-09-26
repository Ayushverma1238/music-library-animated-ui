import React from "react";
import { cn } from "@/utils/cn";

type SpotlightProps = {
  className?: string;
  fill?: string;
};

export const Spotlight = ({ className, fill }: SpotlightProps) => {
  return (
    <svg
      className={cn(
        "pointer-events-none absolute left-1/2 top-0 z-10 h-[169%] w-[138%] -translate-x-1/2 opacity-0 animate-spotlight",
        className,
      )}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 3787 2842"
      fill="none"
    >
      <g filter="url(#filter)">
        <ellipse
          cx="1924.71"
          cy="273.501"
          rx="1924.71"
          ry="273.501"
          transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
          fill={fill || "#ffffff"}
          fillOpacity="0.5"
        />
      </g>

      <defs>
        <filter
          id="filter"
          x="0"
          y="0"
          width="3787"
          height="2842"
          filterUnits="userSpaceOnUse"
        >
          <feGaussianBlur stdDeviation="151" result="blur" />
        </filter>
      </defs>
    </svg>
  );
};
