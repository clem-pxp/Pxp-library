"use client";

import {
  createContext,
  useContext,
  ReactNode,
  ReactElement,
  useEffect,
  isValidElement,
  cloneElement,
} from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { Cross } from "@/components/icons";

interface ModalContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ModalContext = createContext<ModalContextValue | undefined>(undefined);

const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("Modal components must be used within Modal");
  }
  return context;
};

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}

function Modal({ open, onOpenChange, children }: ModalProps) {
  return (
    <ModalContext.Provider value={{ open, onOpenChange }}>
      {children}
    </ModalContext.Provider>
  );
}

const sizeVariants = {
  default: "max-w-[48rem]",
  small: "max-w-[37.5rem]",
} as const;

interface ModalContentProps {
  children: ReactNode;
  className?: string;
  showCloseButton?: boolean;
  size?: keyof typeof sizeVariants;
}

function ModalContent({
  children,
  className,
  showCloseButton = true,
  size = "default",
}: ModalContentProps) {
  const { open, onOpenChange } = useModal();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onOpenChange(false);
      }
    };

    if (open) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, onOpenChange]);

  useEffect(() => {
    if (open) {
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
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => onOpenChange(false)}
            className="fixed inset-0 z-50 bg-slate-950/20 backdrop-blur-xs"
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center p-5 md:p-[12vh] pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 30,
              }}
              onClick={(e) => e.stopPropagation()}
              className={cn(
                "relative bg-light rounded-12 shadow-xl border-0.5 border-border-soft",
                "w-full max-h-full overflow-y-auto pointer-events-auto",
                sizeVariants[size],
                className,
              )}
            >
              {showCloseButton && (
                <button
                  onClick={() => onOpenChange(false)}
                  className="absolute top-3 right-3 size-7 rounded-full flex items-center justify-center cursor-pointer text-soft hover:text-strong hover:bg-app transition-colors duration-200 border-0.5 border-transparent hover:border-border-base"
                >
                  <Cross className="size-4" />
                </button>
              )}

              {children}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

function ModalHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-2 p-6 pb-0", className)} {...props} />
  );
}

function ModalFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex gap-2 justify-end p-6 pt-4", className)}
      {...props}
    />
  );
}

function ModalTitle({ className, ...props }: React.ComponentProps<"h2">) {
  return <h2 className={cn("sub-lg text-strong pr-8", className)} {...props} />;
}

function ModalDescription({ className, ...props }: React.ComponentProps<"p">) {
  return <p className={cn("text-sm text-soft", className)} {...props} />;
}

function ModalBody({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("p-6", className)} {...props} />;
}

interface ModalCloseProps {
  children: ReactNode;
  asChild?: boolean;
  className?: string;
}

function ModalClose({ children, asChild, className }: ModalCloseProps) {
  const { onOpenChange } = useModal();

  if (asChild && isValidElement(children)) {
    return cloneElement(children as ReactElement<{ onClick?: () => void }>, {
      onClick: () => onOpenChange(false),
    });
  }

  return (
    <button
      type="button"
      onClick={() => onOpenChange(false)}
      className={className}
    >
      {children}
    </button>
  );
}

export {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalDescription,
  ModalBody,
  ModalClose,
  useModal,
};
