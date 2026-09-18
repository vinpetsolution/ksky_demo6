"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { IoMdClose } from "react-icons/io";
import { cn } from "@/utils/classNames";
import { AnimatePresence, motion } from "@/lib/motion";
import { Button } from "./Button";

const modalPanelClassName = cn(
    "relative z-[2] flex w-full min-w-[300px] max-w-[95vw] max-h-[90vh] flex-col overflow-hidden rounded-[36px] p-8 sm:p-10 lg:p-[50px]",
    "border border-[rgba(255,180,210,0.14)]",
    "bg-[radial-gradient(circle_at_top_right,rgba(255,120,160,0.14),transparent_30%),linear-gradient(180deg,rgba(82,16,38,0.98),rgba(34,6,16,0.98))]",
    "shadow-[0_20px_60px_rgba(0,0,0,0.50),0_0_40px_rgba(120,20,50,0.12),inset_0_1px_0_rgba(255,255,255,0.04)]",
);

const modalCloseButtonClassName = cn(
    "absolute top-5 right-5 z-[5] hover:text-[#04151d] flex size-11 shrink-0 items-center justify-center rounded-[14px] p-0",
    "border border-[rgba(91,255,223,0.10)] text-[#dffcff]",
    "bg-[linear-gradient(135deg,rgba(17,39,52,0.96),rgba(8,20,29,0.96))]",
    "transition-all duration-350 ease-out",
    "hover:border-[rgba(91,255,223,0.22)] hover:bg-[linear-gradient(135deg,#df7ca5,#df7ca5)]",
    "disabled:pointer-events-none disabled:opacity-50",
);

interface ModalProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
    className?: string;
    showCloseButton?: boolean;
    closeOnOverlayClick?: boolean;
    /** Nhãn cho dialog (a11y). Nên set khi không có tiêu đề visible. */
    "aria-label"?: string;
    footer?: React.ReactNode;
    positionFooter?: "start" | "end" | "center";
    contentClassName?: string;
    disabled?: boolean;
}

const Modal: React.FC<ModalProps> = ({
    open,
    onClose,
    children,
    className = "",
    showCloseButton = true,
    closeOnOverlayClick = true,
    "aria-label": ariaLabel,
    footer,
    positionFooter = "end",
    contentClassName = "",
    disabled = false,
}) => {
    const onCloseRef = useRef(onClose);
    useEffect(() => {
        onCloseRef.current = onClose;
    }, [onClose]);

    const handleOverlayClick = useCallback(() => {
        if (closeOnOverlayClick && !disabled) onClose();
    }, [closeOnOverlayClick, onClose, disabled]);

    useEffect(() => {
        if (!open) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape" && !disabled) onCloseRef.current();
        };
        window.addEventListener("keydown", handleEscape);
        return () => {
            document.body.style.overflow = prev;
            window.removeEventListener("keydown", handleEscape);
        };
    }, [open, disabled]);

    if (typeof document === "undefined") return null;

    const dialog = (
        <motion.div
            // initial={{ opacity: 0 }}
            // animate={{ opacity: 1 }}
            // exit={{ opacity: 0 }}
            // transition={{ duration: 0.4 }}
            role="dialog"
            aria-modal="true"
            aria-label={ariaLabel}
            className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 p-4"
            onClick={disabled ? undefined : handleOverlayClick}
        >
            <motion.div
                // initial={{ opacity: 0, y: 30, scale: 0.96 }}
                // animate={{ opacity: 1, y: 0, scale: 1 }}
                // exit={{ opacity: 0, y: 30, scale: 0.96 }}
                // transition={{ duration: 0.4 }}
                className={cn(modalPanelClassName, className)}
                onClick={(e) => e.stopPropagation()}
            >
                {showCloseButton ? (
                    <Button
                        variant="transparent"
                        type="button"
                        onClick={onClose}
                        disabled={disabled}
                        aria-label="Đóng"
                        className={modalCloseButtonClassName}
                    >
                        <IoMdClose className="size-5" aria-hidden />
                    </Button>
                ) : null}

                <div className={cn("min-h-0 flex-1", contentClassName)}>
                    {children}
                </div>

                {footer ? (
                    <div
                        className={cn(
                            "mt-4 flex shrink-0 items-center justify-end gap-3 border-t border-[rgba(255,180,210,0.14)] pt-4",
                            positionFooter === "start" && "justify-start",
                            positionFooter === "center" && "justify-center",
                        )}
                    >
                        {footer}
                    </div>
                ) : null}
            </motion.div>
        </motion.div>
    );

    return createPortal(
        <AnimatePresence>{open && dialog}</AnimatePresence>,
        document.body,
    );
};

export default Modal;
