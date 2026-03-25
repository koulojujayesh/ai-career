import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-[10px] text-sm font-medium ring-offset-background transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "border-0 bg-[linear-gradient(135deg,#6B9AB8_0%,#4a7a9b_100%)] text-[#F2E4D4] shadow-[0_0_30px_rgba(107,154,184,0.35)] hover:scale-[1.05] hover:shadow-[0_0_50px_rgba(107,154,184,0.55)]",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border-[1.5px] border-[rgba(107,154,184,0.5)] bg-transparent text-[#D2C4B4] backdrop-blur-sm hover:border-[#6B9AB8] hover:bg-[rgba(107,154,184,0.1)] hover:text-[#F2E4D4]",
        secondary: "bg-[rgba(107,154,184,0.15)] text-[#D2C4B4] hover:bg-[rgba(107,154,184,0.24)]",
        ghost: "hover:bg-[rgba(107,154,184,0.12)] hover:text-[#F2E4D4]",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const [ripples, setRipples] = React.useState<Array<{ id: number; x: number; y: number; size: number }>>([]);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      props.onClick?.(event);

      if (asChild) {
        return;
      }

      const rect = event.currentTarget.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = event.clientX - rect.left - size / 2;
      const y = event.clientY - rect.top - size / 2;
      const id = Date.now();

      setRipples((prev) => [...prev, { id, x, y, size }]);
      window.setTimeout(() => {
        setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
      }, 500);
    };

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
        onClick={handleClick}
      >
        {props.children}
        {!asChild &&
          ripples.map((ripple) => (
            <span
              key={ripple.id}
              className="pointer-events-none absolute rounded-full bg-[rgba(255,255,255,0.2)] animate-[ripple_0.5s_ease-out]"
              style={{ left: ripple.x, top: ripple.y, width: ripple.size, height: ripple.size }}
            />
          ))}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
