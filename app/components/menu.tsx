import { createLink } from "@tanstack/react-router";
import { HTMLMotionProps, motion, AnimatePresence } from "motion/react";
import React, { useState } from "react";
import {
  Menu as MenuIcon,
  X,
  List,
  Settings,
  Utensils,
  Package,
  Leaf,
} from "lucide-react";

const MotionLinkComponent = React.forwardRef<
  HTMLAnchorElement,
  HTMLMotionProps<"a">
>((props, ref) => {
  return <motion.a {...props} ref={ref} />;
});

const MotionLink = createLink(MotionLinkComponent);

export const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Menüpunkte mit passenden Icons aus Lucide
  const menuItems = [
    { name: "Tasks", path: "/tasks", icon: <List size={20} /> },
    { name: "Settings", path: "/settings", icon: <Settings size={20} /> },
    { name: "Mealplan", path: "/mealplan", icon: <Utensils size={20} /> },
    { name: "Storage", path: "/storage", icon: <Package size={20} /> },
    { name: "Plants", path: "/plants", icon: <Leaf size={20} /> },
  ];

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  // Berechnet die vertikale Position jedes Menüpunkts
  const getItemPosition = (index: number) => {
    const yOffset = 60;
    return {
      x: 0,
      y: -((index + 2) * yOffset),
    };
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Menüpunkte */}
      <div className="relative">
        {/* Hauptmenü-Button */}
        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.3, type: "spring" }}
          className="relative z-20"
        >
          <button
            onClick={toggleMenu}
            className="rounded-full w-14 h-14 bg-blue-600 flex items-center justify-center shadow-lg"
            type="button"
            aria-label="Menü öffnen/schließen"
          >
            <AnimatePresence initial={false} mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} className="text-white" />
                </motion.div>
              ) : (
                <motion.div
                  key="open"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                >
                  <MenuIcon size={24} className="text-white" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </motion.div>

        {/* Menüpunkte */}
        <AnimatePresence>
          {menuItems.map((item, index) => {
            const { x, y } = getItemPosition(index);

            return (
              <MotionLink
                key={index}
                to={item.path}
                disabled={!isOpen}
                className="absolute right-0 flex items-center gap-2 bg-white rounded-lg shadow-md overflow-hidden"
                initial={{
                  opacity: 0,
                  x: 20,
                  y: 0,
                  width: "48px",
                  height: "48px",
                }}
                animate={{
                  opacity: isOpen ? 1 : 0,
                  x: isOpen ? 0 : 20,
                  y: isOpen ? y : 0,
                  width: isOpen ? "auto" : "48px",
                }}
                exit={{
                  opacity: 0,
                  x: 20,
                  y: 0,
                  width: "48px",
                }}
                transition={{
                  duration: 0.3,
                  delay: isOpen
                    ? index * 0.05
                    : (menuItems.length - index - 1) * 0.05,
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                }}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "#f0f9ff",
                }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-center w-12 h-12 bg-blue-500 text-white">
                  {item.icon}
                </div>
                <motion.span
                  className="font-medium text-blue-800 px-3"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{
                    opacity: isOpen ? 1 : 0,
                    width: isOpen ? "auto" : 0,
                  }}
                  transition={{
                    duration: 0.2,
                    delay: isOpen ? 0.1 + index * 0.05 : 0,
                  }}
                >
                  {item.name}
                </motion.span>
              </MotionLink>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};
