// src/components/common/Modal.tsx
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import type { ReactNode } from "react";
import { X } from "lucide-react";

// Strict type contract parameters configuration
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode; // Injects your dynamic HTML forms or custom content
  size?: "sm" | "md" | "lg" | "xl"; // Controls display bounds dynamically
}

const SIZE_MAP = {
  sm: "max-w-md", // Perfect for Delete Alerts
  md: "max-w-lg", // Perfect for simple settings
  lg: "max-w-2xl", // Perfect for small ticket edits
  xl: "max-w-4xl", // Perfect for massive data views
} as const;

export default function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = "md",
}: ModalProps) {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50 text-left" onClose={onClose}>
        {/* 1. BACKDROP DIMMER OVERLAY WITH BLUR TINT */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" />
        </Transition.Child>

        {/* 2. CORE MODAL WINDOW PLACEMENT ARCHITECTURE */}
        <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className={`relative transform overflow-hidden rounded-2xl bg-white p-6 shadow-2xl border border-slate-100 transition-all w-full ${SIZE_MAP[size]}`}
              >
                {/* Close Trigger top right edge item */}
                <div className="absolute right-4 top-4">
                  <button
                    onClick={onClose}
                    className="rounded-lg p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition focus:outline-none"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Header Context Boundaries */}
                <div className="mb-5">
                  <Dialog.Title
                    as="h3"
                    className="text-base font-bold leading-6 text-slate-900"
                  >
                    {title}
                  </Dialog.Title>
                  {description && (
                    <Dialog.Description className="mt-1 text-xs text-slate-400">
                      {description}
                    </Dialog.Description>
                  )}
                </div>

                {/* DYNAMIC CHILD SLOT OUTPUT Portal INJECTION */}
                <div className="mt-2">{children}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
