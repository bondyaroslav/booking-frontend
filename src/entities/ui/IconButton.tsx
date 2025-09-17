"use client";
import * as React from "react";
import Image, {ImageProps} from "next/image";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";

type Visual =
    | ({
    kind?: "image";
    image: Pick<ImageProps, "src" | "alt"> &
        Partial<Pick<ImageProps, "width" | "height" | "priority">>;
} & { startIcon?: never })
    | ({
    kind?: "icon";
    startIcon: React.ReactNode;
} & { image?: never });

export type IconButtonProps = {
    text: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    isLoading?: boolean;
    disabled?: boolean;
    className?: string;
    "data-testid"?: string;
    "aria-label"?: string;
    title?: string;
    endIcon?: React.ReactNode;
    asChild?: boolean;
    type?: "button" | "submit" | "reset";
} & Partial<Visual>;

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
    function IconButton(
        {
            text,
            onClick,
            isLoading = false,
            disabled = false,
            className,
            "data-testid": testId,
            "aria-label": ariaLabel,
            title,
            endIcon,
            asChild,
            type = "button",
            kind = "image",
            image,
            startIcon,
            ...rest
        },
        ref
    ) {
        const isBlocked = disabled || isLoading;

        const LeftVisual = React.useMemo(() => {
            if (kind === "icon" && startIcon) return <>{startIcon}</>;
            if (kind === "image" && image) {
                const {src, alt, width = 24, height = 24, priority} = image;
                return (
                    <Image
                        src={src}
                        alt={alt}
                        width={width}
                        height={height}
                        priority={priority}
                    />
                );
            }
            return null;
        }, [kind, image, startIcon]);

        return (
            <Button
                ref={ref}
                type={type}
                asChild={asChild}
                onClick={onClick}
                disabled={isBlocked}
                aria-label={ariaLabel ?? text}
                aria-busy={isLoading || undefined}
                data-state={isLoading ? "loading" : undefined}
                data-testid={testId}
                title={title ?? text}
                className={cn(
                    "w-full flex flex-row justify-between gap-3 px-4",
                    "border bg-background text-foreground",
                    "border-border shadow-none hover:bg-accent hover:text-accent-foreground",
                    "text-[#454C6A] font-satoshi text-[16px] font-medium",
                    isBlocked && "opacity-60 cursor-not-allowed",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    className
                )}
                {...rest}
            >
                <span className="flex items-center gap-3">
                {LeftVisual}
                    <span className="truncate" aria-live="polite">
                {isLoading ? "Loading…" : text}
          </span>
        </span>
                {endIcon && <span className="ml-auto flex">{endIcon}</span>}
            </Button>
        );
    }
);
