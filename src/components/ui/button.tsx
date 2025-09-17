import * as React from "react";
import {Slot} from "@radix-ui/react-slot";
import {cva, type VariantProps} from "class-variance-authority";
import {cn} from "@/lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors " +
    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none " +
    "disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 cursor-pointer",
    {
        variants: {
            variant: {
                bookingGhost: "bg-transparent text-[#5F6994] hover:opacity-90 shadow-none",
                bookingPrimary: "text-white shadow-none bg-[#4F5684] hover:opacity-90",
                bookingPrimaryIcon: "text-white shadow-none bg-[#4F5684] hover:opacity-90",
                auth: "w-full h-12 rounded-[8px] border border-[#E8ECF5] bg-white text-[#454C6A] font-satoshi font-medium text-[16px] hover:bg-gray-50",
            },
            size: {
                booking: "w-[120px] h-[48px] rounded-[5px] px-5 gap-1 text-[16px]",
                default: "h-9 px-4 text-sm rounded-md",
                sm: "h-8 px-3 text-xs rounded-md",
                lg: "h-10 px-8 text-sm rounded-md",
                icon: "size-9 rounded-md",
                auth: "w-full h-[52px] px-4 gap-3 text-[16px]"
            },
        },
        defaultVariants: {
            variant: "bookingPrimary",
            size: "booking",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({className, variant, size, asChild = false, ...props}, ref) => {
        const Comp = asChild ? Slot : "button";
        return (
            <Comp
                ref={ref}
                className={cn(buttonVariants({variant, size}), className)}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export {Button, buttonVariants};
