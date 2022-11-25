import { cva, cx, VariantProps } from "cva";
import { forwardRef } from "./system";

const buttonStyles = cva("inline-flex text-gray-700", {
  variants: {
    variant: {
      solid: "border bg-white shadow-sm hover:bg-gray-50",
      outline: "border-gray-400 hover:border-gray-600 border-2",
    },
    size: {
      md: "rounded-md text-sm font-medium px-4 py-2",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "solid",
  },
});

export interface ButtonProps extends VariantProps<typeof buttonStyles> {}

export const Button = forwardRef<ButtonProps, "button">(
  ({ size, variant, as, className, ...props }, ref) => {
    const Component = as ?? "button";
    return (
      <Component
        className={cx(buttonStyles({ size, variant }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
