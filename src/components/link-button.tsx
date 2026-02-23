import type { ComponentProps } from "react";
import { Button, buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";

interface Props extends ComponentProps<"a"> {
  variants?: VariantProps<typeof buttonVariants>;
}

export function LinkButton({ variants, ...props }: Props) {
  return <a {...props} className={cn(buttonVariants(variants))} />;
}
