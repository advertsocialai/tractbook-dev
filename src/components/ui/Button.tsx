import { type ButtonHTMLAttributes, type ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "dark" | "google" | "microsoft" | "success" | "outline";
  children: ReactNode;
  icon?: ReactNode;
};

const VARIANT_STYLES: Record<string, string> = {
  primary: "bg-brand-blue text-white active:bg-brand-blue-dark",
  dark: "bg-[#3a3a3a] text-white active:bg-black",
  google: "bg-brand-blue-mid text-white active:bg-brand-blue-dark",
  microsoft: "bg-[#3f9142] text-white active:bg-[#2e7053]",
  success: "bg-[#3f9142] text-white active:bg-[#2e7053]",
  outline: "bg-white text-black border border-border-soft active:bg-gray-50",
};

export function Button({
  variant = "primary",
  children,
  icon,
  className = "",
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`w-full h-13 min-h-[52px] rounded-full font-semibold text-[15px] flex items-center justify-center gap-2.5 transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${VARIANT_STYLES[variant]} ${className}`}
      disabled={disabled}
      {...rest}
    >
      {icon}
      {children}
    </button>
  );
}
