"use client";

import { cn } from "@/utils/cn";
import React, { useEffect, useRef, useState } from "react";

type MovingCard = {
  quote: string;
  name: string;
  title: string;
};

type InfiniteMovingCardsProps = {
  items: MovingCard[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
};

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: InfiniteMovingCardsProps) => {
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (!scrollerRef.current) return;

    setStart(true);
  }, []);

  const animationDuration = {
    fast: "20s",
    normal: "40s",
    slow: "80s",
  };

  const animationDirection =
    direction === "left" ? "normal" : "reverse";

  /*
   * Duplicate the items in JSX instead of cloning DOM nodes.
   * This is safer with React and Strict Mode.
   */
  const duplicatedItems = [...items, ...items];

  return (
    <div
      className={cn(
        "relative z-20 w-full max-w-7xl overflow-hidden",
        className
      )}
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
      }}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4",
          start && "animate-infinite-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
        style={
          {
            "--animation-duration":
              animationDuration[speed],
            "--animation-direction":
              animationDirection,
          } as React.CSSProperties
        }
      >
        {duplicatedItems.map((item, idx) => (
          <li
            key={`${item.name}-${idx}`}
            className="
              relative
              w-87.5
              max-w-full
              shrink-0
              rounded-2xl
              border
              border-slate-700
              bg-slate-900
              px-8
              py-6
              md:w-112.5
            "
          >
            <blockquote>
              {/* Quote */}
              <span
                className="
                  relative
                  z-20
                  block
                  text-sm
                  font-normal
                  leading-[1.6]
                  text-gray-100
                "
              >
                {item.quote}
              </span>

              {/* User information */}
              <div className="relative z-20 mt-6 flex items-center">
                <div className="flex flex-col gap-1">
                  <span
                    className="
                      text-sm
                      font-medium
                      leading-[1.6]
                      text-gray-200
                    "
                  >
                    {item.name}
                  </span>

                  <span
                    className="
                      text-sm
                      font-normal
                      leading-[1.6]
                      text-gray-400
                    "
                  >
                    {item.title}
                  </span>
                </div>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};