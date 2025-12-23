"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Settings, Vault, Heart } from "@/components/icons";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarLink } from "./sidebar";

interface MobileMenuButtonProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function MobileMenuButton({ isOpen, onToggle }: MobileMenuButtonProps) {
  const topOpenRef = useRef<SVGAnimateElement>(null);
  const topCloseRef = useRef<SVGAnimateElement>(null);
  const bottomOpenRef = useRef<SVGAnimateElement>(null);
  const bottomCloseRef = useRef<SVGAnimateElement>(null);
  const scaleOpenRef = useRef<SVGAnimateElement>(null);
  const scaleCloseRef = useRef<SVGAnimateElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (isOpen) {
      topOpenRef.current?.beginElement();
      bottomOpenRef.current?.beginElement();
      scaleOpenRef.current?.beginElement();
    } else {
      topCloseRef.current?.beginElement();
      bottomCloseRef.current?.beginElement();
      scaleCloseRef.current?.beginElement();
    }
  }, [isOpen]);

  return (
    <button
      onClick={onToggle}
      className="size-7 flex cursor-pointer items-center justify-center rounded-8 border-[0.5px] border-border-base bg-gray-100"
    >
      <svg width="18" height="18" viewBox="0 0 18 18" className="text-soft">
        <g style={{ transformOrigin: "center" }}>
          <animateTransform
            ref={scaleOpenRef}
            attributeName="transform"
            type="scale"
            dur="0.24s"
            begin="indefinite"
            fill="freeze"
            calcMode="spline"
            keySplines="0.42, 0, 0.58, 1"
            values="1; 0.8"
          />
          <animateTransform
            ref={scaleCloseRef}
            attributeName="transform"
            type="scale"
            dur="0.24s"
            begin="indefinite"
            fill="freeze"
            calcMode="spline"
            keySplines="0.42, 0, 0.58, 1"
            values="0.8; 1"
          />
          <polyline
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            points="2 12, 16 12"
          >
            <animate
              ref={bottomOpenRef}
              attributeName="points"
              keyTimes="0;0.5;1"
              dur="0.24s"
              begin="indefinite"
              fill="freeze"
              calcMode="spline"
              keySplines="0.42, 0, 1, 1;0, 0, 0.58, 1"
              values="2 12, 16 12; 2 9, 16 9; 3.5 15, 15 3.5"
            />
            <animate
              ref={bottomCloseRef}
              attributeName="points"
              keyTimes="0;0.5;1"
              dur="0.24s"
              begin="indefinite"
              fill="freeze"
              calcMode="spline"
              keySplines="0.42, 0, 1, 1;0, 0, 0.58, 1"
              values="3.5 15, 15 3.5; 2 9, 16 9; 2 12, 16 12"
            />
          </polyline>
          <polyline
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            points="2 5, 16 5"
          >
            <animate
              ref={topOpenRef}
              attributeName="points"
              keyTimes="0;0.5;1"
              dur="0.24s"
              begin="indefinite"
              fill="freeze"
              calcMode="spline"
              keySplines="0.42, 0, 1, 1;0, 0, 0.58, 1"
              values="2 5, 16 5; 2 9, 16 9; 3.5 3.5, 15 15"
            />
            <animate
              ref={topCloseRef}
              attributeName="points"
              keyTimes="0;0.5;1"
              dur="0.24s"
              begin="indefinite"
              fill="freeze"
              calcMode="spline"
              keySplines="0.42, 0, 1, 1;0, 0, 0.58, 1"
              values="3.5 3.5, 15 15; 2 9, 16 9; 2 5, 16 5"
            />
          </polyline>
        </g>
      </svg>
    </button>
  );
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const NAVIGATION_ITEMS = [
  { href: "/", icon: Vault, label: "The Vault" },
  { href: "/favorites", icon: Heart, label: "Favorites" },
  { href: "/settings", icon: Settings, label: "Settings" },
] as const;

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "calc(100vh - 2.75rem)" }}
          exit={{ height: 0 }}
          transition={{ ease: [0.645, 0.045, 0.355, 1], duration: 0.4 }}
          className="fixed left-0 right-0 top-11 z-50 overflow-hidden bg-main"
        >
          <ScrollArea className="h-full">
            <motion.nav
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                visible: {
                  transition: { staggerChildren: 0.05, delayChildren: 0.1 },
                },
              }}
              className="flex flex-col px-2 pt-4"
            >
              {NAVIGATION_ITEMS.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                return (
                  <motion.div
                    key={item.href}
                    variants={{
                      hidden: { opacity: 0, y: "-10%" },
                      visible: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.3 }}
                    onClick={onClose}
                  >
                    <SidebarLink
                      href={item.href}
                      icon={<item.icon className="size-4" />}
                      label={item.label}
                      isActive={isActive}
                    />
                  </motion.div>
                );
              })}
            </motion.nav>
          </ScrollArea>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
