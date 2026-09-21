"use client";

/**
 * Button Component (PRD 13.6)
 *
 * Tinggi ≥ 56px, ikon + label, tiga varian.
 * State hover, focus, active, disabled terlihat jelas.
 * Target sentuh ≥ 44px (A11Y-24).
 */

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "neutral";
type ButtonSize = "default" | "large";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  iconRight?: ReactNode;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-ui-accent text-white hover:bg-ui-accent-hover active:bg-ui-accent-hover shadow-sm",
  secondary:
    "bg-white text-text-primary border-2 border-ui-border hover:border-ui-accent hover:text-ui-accent active:bg-bg-tertiary",
  neutral:
    "bg-bg-tertiary text-text-secondary hover:bg-ui-border hover:text-text-primary active:bg-ui-border-strong",
};

const sizeStyles: Record<ButtonSize, string> = {
  default: "h-14 px-6 text-base gap-3",
  large: "h-16 px-8 text-lg gap-4",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "default",
      icon,
      iconRight,
      fullWidth,
      className = "",
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={[
          "inline-flex items-center justify-center font-semibold",
          "rounded-lg transition-all duration-150",
          "focus-visible:outline-3 focus-visible:outline-ui-accent focus-visible:outline-offset-2",
          "disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none",
          "select-none",
          variantStyles[variant],
          sizeStyles[size],
          fullWidth ? "w-full" : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        {children && <span>{children}</span>}
        {iconRight && <span className="shrink-0">{iconRight}</span>}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
