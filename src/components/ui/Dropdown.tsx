"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/utils/classNames";
import { IoChevronDown } from "react-icons/io5";
import { Button } from "./Button";

export interface DropdownOption {
  value: string;
  label: string;
}

/** Cùng palette input trắng (RegistrationModal, form) */
export const dropdownTriggerClassName = cn(
  "flex h-11 w-full items-center justify-between gap-2 rounded-lg border border-[#ddd] bg-white px-[15px]",
  "text-left text-sm font-normal text-black shadow-[0_1px_2px_rgba(0,0,0,0.25)]",
  "transition-[border-color,box-shadow] duration-300 hover:bg-white focus:outline-none focus:border-[#bbb]",
);

interface DropdownProps {
  options: DropdownOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  position?: "bottom" | "top" | "auto";
  className?: string;
  buttonClassName?: string;
}

export function Dropdown({
  options,
  value = "",
  onChange,
  placeholder = "선택하세요.",
  position = "auto",
  className,
  buttonClassName,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState<"bottom" | "top">("bottom");
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((o) => o.value === value);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isOpen || position !== "auto" || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    const newPos = spaceBelow >= 200 || spaceBelow >= spaceAbove ? "bottom" : "top";
    const rafId = requestAnimationFrame(() => setDropdownPosition(newPos));
    return () => cancelAnimationFrame(rafId);
  }, [isOpen, position]);

  const displayPosition = position === "auto" ? dropdownPosition : position;

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <Button
        variant="transparent"
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        className={cn(dropdownTriggerClassName, buttonClassName)}
        rightIcon={
          <IoChevronDown
            className={cn(
              "size-5 shrink-0 text-black/50 transition-transform duration-200",
              isOpen && "rotate-180",
            )}
          />
        }
      >
        <span
          className={cn(
            "truncate",
            selectedOption ? "text-black" : "text-black/45",
          )}
        >
          {selectedOption?.label ?? placeholder}
        </span>
      </Button>

      {isOpen && (
        <div
          ref={menuRef}
          className={cn(
            "absolute left-0 right-0 z-50 max-h-48 overflow-y-auto rounded-lg border border-[#ddd] bg-white",
            "shadow-[0_8px_24px_rgba(0,0,0,0.12)] scrollbar-thin",
            displayPosition === "bottom" ? "top-full mt-1" : "bottom-full mb-1",
          )}
        >
          {options.map((opt, index) => (
            <Button
              variant="transparent"
              key={opt.value}
              type="button"
              onClick={() => {
                onChange?.(opt.value);
                setIsOpen(false);
              }}
              className={cn(
                "flex w-full items-center justify-start rounded-none px-[15px] py-2.5 text-left text-sm font-normal transition-colors",
                index === 0 && "rounded-t-lg",
                index === options.length - 1 && "rounded-b-lg",
                opt.value === value
                  ? "bg-[rgba(223,124,165,0.14)] font-semibold text-black"
                  : "text-black hover:bg-black/10",
              )}
            >
              {opt.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
