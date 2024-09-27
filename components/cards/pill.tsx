"use client";

import React, { useRef, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Cloud, KeyRound, NotepadText } from "lucide-react";
import { cn } from "@/lib/utils";

type NavState = {
  opacity: number;
  left: number;
  width: number;
};

const Pill = () => {
  const [hoverState, setHoverState] = useState<NavState>({
    opacity: 0,
    left: 0,
    width: 0,
  });
  const [activeState, setActiveState] = useState<NavState>({
    opacity: 1,
    left: 0,
    width: 0,
  });
  const [active, setActive] = useState<number>(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  const items = [
    {
      name: "Connect",
      icon: KeyRound,
      text: "Info",
      description: "248k active users",
      color: "#008FFF",
      bg: "#001526",
    },
    {
      name: "Contracts",
      icon: NotepadText,
      text: "Details",
      description: "7 active contracts",
      color: "#00CB48",
      bg: "#001E0B",
    },
    {
      name: "Engine",
      icon: Cloud,
      text: "Check",
      description: "Optimal engine health",
      color: "#FF58AE",
      bg: "#260D1A",
    },
  ];

  useEffect(() => {
    if (itemRefs.current[active]) {
      const { offsetLeft, offsetWidth } = itemRefs.current[active];
      setActiveState({
        opacity: 1,
        left: offsetLeft,
        width: offsetWidth,
      });
    }
  }, [active]);

  const handleMouseEnter = (index: number) => {
    if (!itemRefs.current[index]) return;

    const { offsetLeft, offsetWidth } = itemRefs.current[index];
    setHoverState({
      opacity: 1,
      left: offsetLeft,
      width: offsetWidth,
    });
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setHoverState((prev) => ({
      ...prev,
      opacity: 0,
    }));
    setIsHovering(false);
  };

  const Icon = items[active].icon;

  return (
    <div className="h-screen flex items-center justify-center border-t w-full">
      <div className="w-[500px] flex flex-col items-center justify-center gap-y-10 overflow-hidden rounded-none border-y-[1px] border-preview-border-light bg-preview-light p-4 py-32 shadow-sm dark:border-preview-border-dark dark:bg-black sm:rounded-xl sm:border">
        <motion.div
          layout
          className="flex cursor-pointer items-center justify-between gap-x-2 overflow-hidden border-[1px] border-[#E5E5E5] bg-white pl-[10px] pr-2 w-fit mx-auto text-[#0A0A0A] shadow-sm dark:border-[#171717] dark:bg-[#0A0A0A] dark:text-[#fafafa] h-10 rounded-full"
          transition={{
            duration: 0.2,
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
          animate={{ width: "auto" }}
        >
          <div className="flex w-auto items-center justify-between gap-2 overflow-hidden">
            <div className="flex items-center justify-center gap-2">
              <Icon
                className="size-4"
                style={{
                  color: items[active].color,
                }}
              />
              <motion.span
                className="w-auto translate-x-0 translate-y-0 select-none font-openrunde text-sm font-medium"
                data-ninja-font="openrunde_medium_normal_t3blb"
                layout
                transition={{
                  duration: 0.3,
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
              >
                {items[active].name}
              </motion.span>
            </div>
            {isClicked && (
              <AnimatePresence>
                <motion.div
                  className="flex w-auto items-center justify-center gap-x-2 overflow-hidden"
                  style={{
                    opacity: 1,
                    willChange: "auto",
                    filter: "none",
                  }}
                >
                  <span className="select-none font-openrunde text-sm font-medium text-[#999]">
                    ·
                  </span>
                  <span className="translate-x-0 translate-y-0 select-none text-nowrap font-openrunde text-sm font-medium text-[#999]">
                    {items[active].description}
                  </span>
                </motion.div>
              </AnimatePresence>
            )}
          </div>
          <motion.button
            className="rounded-full py-1 px-3 text-sm tracking-tighter"
            style={{
              color: items[active].color,
              backgroundColor: items[active].bg,
            }}
            onClick={() => setIsClicked(!isClicked)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {items[active].text}
          </motion.button>
        </motion.div>
        <div className="flex h-8 items-center gap-2 relative justify-center">
          {items.map((item, index) => (
            <motion.li
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              onClick={() => {
                setIsClicked(false);
                setActive(index);
              }}
              key={index}
              className={cn(
                "h-full flex relative items-center justify-center px-3 z-10 cursor-pointer list-none",
                {
                  "text-white": active === index,
                }
              )}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {item.name}
            </motion.li>
          ))}
          <motion.div
            animate={isHovering ? hoverState : activeState}
            className="absolute bg-muted rounded z-0 h-full"
            transition={{
              duration: 0.3,
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Pill;
