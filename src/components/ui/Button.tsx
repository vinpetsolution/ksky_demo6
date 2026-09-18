"use client";

import { type ButtonHTMLAttributes, type Ref } from "react";
import { cn } from "@/utils/classNames";
import { ButtonShine } from "@/components/ui/ButtonShine";

const buttonVariants = {
  variant: {
    darkBlue: "bg-[linear-gradient(135deg,#112734fa,#08141dfa)] text-[#dffcff] border border-[#5bffdf24] hover:text-[#04151d] hover:bg-[linear-gradient(135deg,#df7ca5,#df7ca5)]",
    pink: cn(
      "bg-[linear-gradient(135deg,#a52a58_0%,#7c1d43_35%,#51122b_70%,#c43f73_100%)] text-[#fff7fa]",
      "border border-[#ffaad247]",
      "shadow-[0_0_26px_rgb(184_46_102/0.18),0_0_14px_rgb(255_120_180/0.12)] backdrop-blur-[10px]",
    ),
    darkPink: cn(
      "bg-[linear-gradient(135deg,#34101efa_0%,#1e0a12fa_45%,#0e0509fc_100%)] text-[#f6e7ec]",
      "border border-[#ffaad21a]",
      "shadow-[0_10px_24px_rgb(0_0_0/0.3),0_0_18px_rgb(184_46_102/0.06),inset_0_1px_0_rgb(255_255_255/0.03)] backdrop-blur-[10px]",
    ),
    darkBlueGlow: cn(
      "bg-[linear-gradient(135deg,#112734fa,#08141dfa)] text-[#dffcff] border border-[#5bffdf24]",
      "hover:text-[#04151d] hover:bg-[linear-gradient(135deg,#df7ca5,#df7ca5)]",
      "shadow-[0_0_16px_rgb(91_255_223/0.12)]",
    ),
    red: "text-white bg-[#dc2626] hover:bg-[#b91c1c] border border-[#ef444444]",
    success: "text-white bg-[#198754] hover:bg-[#157347]",
    transparent:
      "bg-transparent text-gray hover:text-black disabled:text-gray",
  },
  size: {
    sm: "h-8 px-3 text-sm rounded-md gap-1.5",
    md: "h-10 px-4 text-sm rounded-lg gap-2",
    lg: "h-12 px-6 text-base rounded-lg gap-2.5",
  },
} as const;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonVariants.variant;
  size?: keyof typeof buttonVariants.size;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  contentClassName?: string;
  /** Vệt shine motion (parent cần `relative overflow-hidden`) */
  shine?: boolean;
  ref?: Ref<HTMLButtonElement>;
}

const Button = ({
  className,
  variant = "darkBlue",
  size = "md",
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth,
  contentClassName,
  shine = false,
  disabled,
  children,
  type = "button",
  ref,
  ...props
}: ButtonProps) => {
  const isDisabled = disabled || loading;

  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      className={cn(
        "inline-flex font-bold items-center justify-center transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none",
        "cursor-pointer",
        (isDisabled || loading) && "cursor-not-allowed opacity-50",
        buttonVariants.variant[variant],
        buttonVariants.size[size],
        fullWidth && "w-full",
        shine && !loading && !isDisabled && "relative overflow-hidden",
        className
      )}
      {...props}
    >
      {shine && !loading && !isDisabled ? <ButtonShine /> : null}
      {loading ? (
        <span
          className="relative z-2 size-5 shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent"
          aria-hidden
        />
      ) : leftIcon ? (
        <span className="relative z-2 inline-flex shrink-0">{leftIcon}</span>
      ) : null}
      {children ? (
        <span className={cn("relative z-2", contentClassName)}>{children}</span>
      ) : null}
      {!loading && rightIcon ? (
        <span className="relative z-2 inline-flex shrink-0">{rightIcon}</span>
      ) : null}
    </button>
  );
};

Button.displayName = "Button";

export { Button };
