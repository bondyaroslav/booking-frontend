"use client";
import * as React from "react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {useBookingStore} from "@/entities/booking/model/store";

type CodeConfirmationStepProps = {
    length?: number;
    onConfirmAction?: (code: string) => void;
};

export default function CodeConfirmationStep(
    {
        length = 6,
        onConfirmAction,
    }: CodeConfirmationStepProps) {
    const {step, setStep} = useBookingStore();

    const [values, setValues] = React.useState<string[]>(
        Array.from({length}, () => "")
    );
    const inputsRef = React.useRef<Array<HTMLInputElement | null>>([]);

    const focusIndex = (idx: number) => {
        const el = inputsRef.current[idx];
        if (el) el.focus();
    };

    const setAt = (idx: number, val: string) => {
        setValues((prev) => {
            const next = [...prev];
            next[idx] = val;
            return next;
        });
    };

    const handleChange =
        (idx: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
            const raw = e.currentTarget.value.replace(/\D/g, "");
            if (!raw) {
                setAt(idx, "");
                return;
            }
            const chars = raw.split("");
            setValues((prev) => {
                const next = [...prev];
                let p = idx;
                for (const ch of chars) {
                    if (p >= length) break;
                    next[p] = ch;
                    p++;
                }
                const nextEmpty = next.findIndex((v, i) => v === "" && i >= idx);
                focusIndex(nextEmpty === -1 ? Math.min(p, length - 1) : nextEmpty);
                return next;
            });
        };

    const handleKeyDown =
        (idx: number) => (e: React.KeyboardEvent<HTMLInputElement>) => {
            const key = e.key;

            if (key === "Backspace") {
                e.preventDefault();
                setValues((prev) => {
                    const next = [...prev];
                    if (next[idx]) {
                        next[idx] = "";
                        return next;
                    }
                    const prevIdx = Math.max(0, idx - 1);
                    next[prevIdx] = "";
                    focusIndex(prevIdx);
                    return next;
                });
                return;
            }

            if (key === "ArrowLeft") {
                e.preventDefault();
                focusIndex(Math.max(0, idx - 1));
                return;
            }
            if (key === "ArrowRight") {
                e.preventDefault();
                focusIndex(Math.min(length - 1, idx + 1));
                return;
            }
        };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const data = e.clipboardData.getData("text").replace(/\D/g, "");
        if (!data) return;
        const chars = data.slice(0, length).split("");
        setValues((prev) => {
            const next = [...prev];
            for (let i = 0; i < length; i++) next[i] = chars[i] ?? "";
            return next;
        });
        focusIndex(Math.min(chars.length, length - 1));
    };

    const code = values.join("");
    const isComplete = code.length === length && values.every((v) => v !== "");

    const submit = () => {
        if (!isComplete) return;
        onConfirmAction?.(code);
        setStep(step + 1);
    };

    const back = () => {
        setStep(Math.max(1, step - 1));
    };

    return (
        <div className="space-y-8">
            <div>
                <h2
                    className="
                    font-satoshi
                    font-medium
                    text-[31px]
                    text-center
                    leading-[140%]
                    tracking-[-0.0075em]
                    align-middle
                    bg-gradient-to-r from-[#454C6A] to-[#5F6994]
                    bg-clip-text
                    text-transparent
                    "
                >
                    Code confirmation
                </h2>
                <p className="text-[#6069A2] text-center">
                    Please provide your phone number
                </p>
            </div>

            <div className="flex justify-center gap-3">
                {values.map((val, i) => (
                    <Input
                        key={i}
                        ref={(el) => {inputsRef.current[i] = el}}
                        type="text"
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        value={val}
                        onChange={handleChange(i)}
                        onKeyDown={handleKeyDown(i)}
                        onPaste={handlePaste}
                        maxLength={1}
                        className={cn(
                            "h-[50px] w-[50px] text-center text-[22px] font-semibold",
                            "rounded-[10px] border border-[#E4E8F0] bg-white",
                            "shadow-none focus-visible:ring-2 focus-visible:ring-[#4F5684]/20 focus-visible:border-[#4F5684]",
                            "text-[#454C6A] placeholder-transparent"
                        )}
                    />
                ))}
            </div>

            <div className="flex flex-col items-center gap-4">
                <Button
                    className="
                    mx-auto h-[48px] w-[200px] rounded-[8px] bg-[#4F5684]
                    text-[16px] font-medium text-white hover:opacity-90
                    "
                    disabled={!isComplete}
                    onClick={submit}
                >
                    Confirm
                </Button>

                <Button variant="bookingGhost" size="booking" type="button" onClick={back}>
                    Back
                </Button>
            </div>
        </div>
    );
}
