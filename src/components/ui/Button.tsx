import clsx from "clsx";
import { NavLink } from "react-router-dom";

type ButtonVariant = 
|'primary' 
| 'secondary' 
| 'outline'
| 'tertiary' 
| 'navButton' 
| 'navLink' 
| 'navLinkActive';

const buttonStyles: Record<ButtonVariant, string> = {
  primary:
    "inline-flex items-center justify-center rounded-xl bg-amber-600 px-6 py-3 font-semibold text-white shadow-lg shadow-amber-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-amber-600 hover:shadow-xl hover:shadow-amber-500/30 focus:outline-none focus:ring-2 focus:ring-primary/50",

  secondary:
    "inline-flex items-center justify-center rounded-xl bg-surface px-6 py-3 font-semibold text-text border border-border transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary/30",

  outline:
    "inline-flex items-center justify-center rounded-xl border border-border bg-transparent px-6 py-3 font-semibold text-text transition-all duration-200 hover:-translate-y-0.5  hover:border-primary hover:bg-primary/5 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/30",

  tertiary:
    "inline-flex items-center justify-center rounded-xl px-5 py-3 font-medium text-text-muted transition-all duration-200 hover:bg-surface hover:text-text focus:outline-none focus:ring-2 focus:ring-primary/30",

  navButton:
    "inline-flex items-center justify-center rounded-lg bg-primary/10 px-3 py-2 font-semibold text-primary transition-colors duration-200 hover:-translate-y-0.5 ",

  navLink:
    "inline-flex items-center justify-center rounded-lg px-3 py-2 font-semibold transition-colors duration-200 hover:bg-surface hover:text-text",

  navLinkActive:
    "inline-flex items-center justify-center rounded-lg bg-primary/10 px-3 py-2 font-semibold text-primary transition-colors duration-200",
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  to?: string;
};

function Button({ 
  children, 
  variant = 'primary',
  className,
  to,
  ...props
}: ButtonProps) {
  if (to) {
    return (
      <NavLink
        to={to}
        className={clsx(
          buttonStyles[variant],
          className,
        )}
      >
        {children}
      </NavLink>
    )
  }
  return (
    <button 
      {...props}
      className={clsx(
        buttonStyles[variant],
        className ,
        "cursor-pointer"
      )}>
      {children}
    </button>
  );
}

export default Button;