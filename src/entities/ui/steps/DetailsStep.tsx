"use client";
import * as React from "react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useBookingStore} from "@/entities/booking/model/store";
import {cn} from "@/lib/utils";

function ddMMtoISO(ddmm: string): string | null {
    const parts = ddmm.split(".");
    if (parts.length !== 2) return null;
    const [dd, mm] = parts;
    const year = new Date().getFullYear();
    const iso = `${year}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}`;
    const d = new Date(iso);
    return Number.isNaN(d.getTime()) ? null : iso;
}

type BookingResponse = {
    booking: { id: string }
};

export default function DetailsStep() {
    const {step, setStep, guests, calendarDate, time, email, setEmail, setBookingId} = useBookingStore();

    const emailStr = email ?? "";

    const [first, setFirst] = React.useState("");
    const [last, setLast] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    const emailOk = React.useMemo(
        () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr.trim()),
        [emailStr]
    );

    const canSubmit =
        first.trim() !== "" &&
        last.trim() !== "" &&
        emailOk &&
        !!guests &&
        !!calendarDate &&
        !!time;

    const fieldWrapper =
        "rounded-[10px] border border-[#E4E8F0] bg-white px-4 py-3 focus-within:ring-2 focus-within:ring-[#4F5684]/20 focus-within:border-[#4F5684]";
    const inputClass = cn(
        "h-6 w-full border-0 bg-transparent p-0 shadow-none",
        "text-[#454C6A] placeholder:text-[#5F6994]/60",
        "focus-visible:ring-0 focus-visible:ring-offset-0"
    );

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        if (!canSubmit) return;

        const isoDate = ddMMtoISO(calendarDate!);
        if (!isoDate) {
            setError("Invalid date.");
            return;
        }

        const payload = {
            email: emailStr.trim(),
            firstName: first.trim(),
            lastName: last.trim(),
            people: guests!,
            date: isoDate,
            time: time!,
        };

        try {
            setLoading(true);
            const res = await fetch("/api/bookings", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const txt = await res.text().catch(() => "");
                throw new Error(`Booking failed: ${res.status} ${txt}`);
            }

            const data = (await res.json()) as BookingResponse;
            setBookingId(data.booking.id);
            setStep(step + 1);
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : String(err);
            setError(msg || "Unknown error");
        } finally {
            setLoading(false);
        }
    };

    const goBack = () => setStep(Math.max(1, step - 1));

    return (
        <form className="space-y-6" onSubmit={onSubmit}>
            <div>
                <h2
                    className="
                        font-satoshi font-medium text-[31px] leading-[140%]
                        tracking-[-0.0075em] align-middle
                        bg-gradient-to-r from-[#454C6A] to-[#5F6994]
                        bg-clip-text text-transparent
                    "
                >
                    Your details
                </h2>
                <p className="text-[#6069A2]">Please provide your details below</p>
            </div>

            <div className="space-y-2">
                <label className="text-[#454C6A]">First name</label>
                <div className={fieldWrapper}>
                    <Input
                        value={first}
                        onChange={(e) => setFirst(e.currentTarget.value)}
                        placeholder="Name"
                        className={inputClass}
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-[#454C6A]">Second name</label>
                <div className={fieldWrapper}>
                    <Input
                        value={last}
                        onChange={(e) => setLast(e.currentTarget.value)}
                        placeholder="Surname"
                        className={inputClass}
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-[#454C6A]">E-mail</label>
                <div className={fieldWrapper}>
                    <Input
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        value={emailStr}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your.email@gmail.com"
                        className={inputClass}
                    />
                </div>
                {!emailOk && emailStr.length > 0 && (
                    <p className="text-xs text-red-500">Please enter a valid email.</p>
                )}
            </div>

            {error && (
                <p className="text-sm text-red-500">
                    {error}
                </p>
            )}

            <div className="pt-4 flex flex-col items-center gap-4">
                <Button
                    type="submit"
                    disabled={!canSubmit || loading}
                    className="h-[48px] w-[200px] rounded-[8px] bg-[#4F5684] text-white text-[16px] font-medium hover:opacity-90"
                >
                    {loading ? "Processing..." : "Confirm"}
                </Button>

                <Button variant="bookingGhost" size="booking" type="button" onClick={goBack}>
                    Back
                </Button>
            </div>
        </form>
    );
}
