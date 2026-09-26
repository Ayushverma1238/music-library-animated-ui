"use client";

import React, { useRef } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";

type StickyScrollProps = {
  content: {
    title: string;
    description: string;
  }[];
};

export const StickyScroll = ({
  content,
}: StickyScrollProps) => {
  const [activeCard, setActiveCard] = React.useState(0);

  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  });

  const cardLength = content.length;

  useMotionValueEvent(
    scrollYProgress,
    "change",
    (latest) => {
      const cardsBreakpoints = content.map(
        (_, index) => index / cardLength
      );

      cardsBreakpoints.forEach(
        (breakpoint, index) => {
          if (
            latest > breakpoint - 0.2 &&
            latest <= breakpoint
          ) {
            setActiveCard(index);
          }
        }
      );
    }
  );

  /*
   * Use actual colors instead of CSS variables.
   * Framer Motion can interpolate these values.
   */
  const backgroundColors = [
    "#0f172a", // slate-900
    "#000000", // black
    "#171717", // neutral-900
  ];

  /*
   * These are used for the visual card.
   */
  const linearGradients = [
    "linear-gradient(to bottom right, #06b6d4, #10b981)",
    "linear-gradient(to bottom right, #ec4899, #6366f1)",
    "linear-gradient(to bottom right, #f97316, #eab308)",
  ];

  const activeBackground =
    backgroundColors[
      activeCard % backgroundColors.length
    ];

  const activeGradient =
    linearGradients[
      activeCard % linearGradients.length
    ];

  return (
    <motion.div
      ref={ref}
      animate={{
        backgroundColor: activeBackground,
      }}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
      }}
      className="
        h-120
        overflow-y-auto
        flex
        justify-center
        relative
        space-x-10
        scrollbar-none
        rounded-md
        p-10
      "
    >
      {/* Text Content */}
      <div className="relative flex items-start px-4">
        <div className="max-w-2xl">
          {content.map((item, index) => (
            <div
              key={`${item.title}-${index}`}
              className="my-20"
            >
              <motion.h2
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity:
                    activeCard === index ? 1 : 0.3,
                }}
                transition={{
                  duration: 0.3,
                }}
                className="
                  text-2xl
                  font-bold
                  text-slate-100
                "
              >
                {item.title}
              </motion.h2>

              <motion.p
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity:
                    activeCard === index ? 1 : 0.3,
                }}
                transition={{
                  duration: 0.3,
                }}
                className="
                  max-w-sm
                  mt-10
                  text-sm
                  text-slate-300
                "
              >
                {item.description}
              </motion.p>
            </div>
          ))}

          <div className="h-40" />
        </div>
      </div>

      {/* Gradient Card */}
      <motion.div
        animate={{
          backgroundImage: activeGradient,
        }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
        className="
          hidden
          lg:block
          h-60
          w-80
          rounded-md
          sticky
          top-10
          overflow-hidden
          shrink-0
        "
      />
    </motion.div>
  );
};