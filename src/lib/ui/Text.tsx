import { cn } from "@/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";
import type { HTMLAttributes } from "preact/compat";

const textVariants = cva("font-head", {
  variants: {
    as: {
      p: "font-sans text-base",
      li: "font-sans text-base",
      a: "font-sans text-base hover:underline underline-offset-2 decoration-primary",
      h1: "text-4xl lg:text-5xl font-bold",
      h2: "text-3xl lg:text-4xl font-semibold",
      h3: "text-2xl font-medium",
      h4: "text-xl font-normal",
      h5: "text-lg font-normal",
      h6: "text-base font-normal",
    },
  },
  defaultVariants: {
    as: "p",
  },
});

interface TextProps
  extends Omit<HTMLAttributes<HTMLParagraphElement>, "className">,
    VariantProps<typeof textVariants> {
  className?: string;
}

export const Text = (props: TextProps) => {
  const { className, as, ...otherProps } = props;
  const Tag: any = as || "p";

  return (
    <Tag className={cn(textVariants({ as }), className)} {...otherProps} />
  );
};
