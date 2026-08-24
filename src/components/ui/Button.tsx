import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "teal";
  href?: string;
};

export function Button({ children, variant = "primary", className = "", href, ...props }: ButtonProps) {
  const styles = {
    primary: "bg-navy-800 text-white border-navy-800 hover:bg-navy-700",
    secondary: "bg-white text-navy-800 border-line hover:border-navy-800",
    ghost: "bg-transparent text-white border-white/50 hover:border-white hover:bg-white/10",
    teal: "bg-teal-600 text-white border-teal-600 hover:bg-navy-800",
  }[variant];
  const classes = `inline-flex items-center justify-center gap-2 rounded-md border px-4 py-2.5 text-sm font-semibold ${styles} ${className}`;
  if (href) return <a href={href} className={classes}>{children}</a>;
  return <button className={classes} {...props}>{children}</button>;
}
