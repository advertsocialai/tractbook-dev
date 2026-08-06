import wordmarkUrl from "../../assets/tractbook-wordmark.svg";

type WordmarkProps = {
  /** "light" = white logo for dark/gradient backgrounds. "dark" = black logo for white backgrounds. */
  variant?: "dark" | "light";
  className?: string;
};

/**
 * Real Tractbook wordmark, exported directly from Figma (Frame_1000003127).
 * The source asset is white; for the dark variant we force it to solid
 * black via a CSS filter rather than requesting a second export.
 */
export function Wordmark({ variant = "dark", className = "" }: WordmarkProps) {
  return (
    <img
      src={wordmarkUrl}
      alt="Tractbook"
      className={`h-[23px] w-auto select-none ${
        variant === "dark" ? "brightness-0" : ""
      } ${className}`}
      draggable={false}
    />
  );
}
