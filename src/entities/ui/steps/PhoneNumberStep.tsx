"use client";
import * as React from "react";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {useBookingStore} from "@/entities/booking/model/store";

type Country = {
    id: "NO" | "SE" | "DK";
    flag: string;
    name: string;
    dial: string;
    format: (raw: string) => string;
};

const COUNTRIES: Country[] = [
    {
        id: "NO",
        flag: "🇳🇴",
        name: "Norway",
        dial: "+47",
        format: (raw) => {
            const v = raw.replace(/\D/g, "").slice(0, 8);
            if (v.length <= 3) return v;
            if (v.length <= 5) return `${v.slice(0, 3)} ${v.slice(3)}`;
            return `${v.slice(0, 3)} ${v.slice(3, 5)} ${v.slice(5)}`;
        },
    },
    {
        id: "SE", flag: "🇸🇪", name: "Sweden", dial: "+46", format: (r) =>
            r.replace(/\D/g, "").slice(0, 9).replace(/(\d{3})(\d{3})(\d{0,3})/, (_, a, b, c) => [a, b, c].filter(Boolean).join(" "))
    },
    {
        id: "DK", flag: "🇩🇰", name: "Denmark", dial: "+45", format: (r) =>
            r.replace(/\D/g, "").slice(0, 8).replace(/(\d{4})(\d{0,4})/, (_, a, b) => [a, b].filter(Boolean).join(" "))
    },
];

type PhoneNumberStepProps = {
    defaultCountryId?: Country["id"];
};

export default function PhoneNumberStep(
    {
        defaultCountryId = "NO",
    }: PhoneNumberStepProps) {
    const {step, setStep} = useBookingStore();

    const [countryId, setCountryId] = React.useState<Country["id"]>(defaultCountryId);
    const country = React.useMemo(
        () => COUNTRIES.find((c) => c.id === countryId) ?? COUNTRIES[0],
        [countryId]
    );

    const [local, setLocal] = React.useState("");
    const rawLocal = React.useMemo(() => local.replace(/\D/g, ""), [local]);
    const e164 = React.useMemo(() => `${country.dial}${rawLocal}`, [country.dial, rawLocal]);

    const handleLocalChange = (v: string) => setLocal(country.format(v));

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (rawLocal.length < 6) return; // проста валідація
        // onSubmit?.({country, local, e164}); // мок відправки
        setStep(step + 1); // → наступна сторінка
    };

    const handleBack = () => {
        // onBack?.();
        setStep(Math.max(1, step - 1)); // ← попередня сторінка
    };

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
                <h2
                    className="
                    font-satoshi
                    font-medium
                    text-[31px]
                    leading-[140%]
                    tracking-[-0.0075em]
                    align-middle
                    bg-gradient-to-r from-[#454C6A] to-[#5F6994]
                    bg-clip-text
                    text-transparent
                    "
                >
                    Phone number
                </h2>
                <p className="text-[#6069A2]">
                    Please provide your phone number
                </p>
            </div>

            <div
                className={cn(
                    "rounded-[10px] border border-[#E4E8F0] bg-white px-3 py-2",
                    "focus-within:border-[#4F5684] focus-within:ring-2 focus-within:ring-[#4F5684]/20 transition-colors"
                )}
            >
                <div className="flex items-center gap-2">
                    <Select value={countryId} onValueChange={(v) => setCountryId(v as Country["id"])}>
                        <SelectTrigger
                            className="h-9 w-auto border-0 bg-transparent px-0 shadow-none focus:ring-0 focus:ring-offset-0">
                            <span className="text-[18px] leading-none">{country.flag}</span>
                            <span className="ml-2 text-[#454C6A] font-medium">{country.dial}</span>
                        </SelectTrigger>
                        <SelectContent align="start">
                            {COUNTRIES.map((c) => (
                                <SelectItem key={c.id} value={c.id}>
                                    <span className="mr-2">{c.flag}</span>
                                    {c.dial} — {c.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Input
                        type="tel"
                        inputMode="numeric"
                        autoComplete="tel"
                        placeholder="243 35 63"
                        value={local}
                        onChange={(e) => handleLocalChange(e.currentTarget.value)}
                        maxLength={12}
                        className="h-10 flex-1 border-0 bg-transparent p-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 text-[#454C6A] placeholder:text-[#5F6994]/60"
                    />
                </div>
            </div>

            <div className="flex flex-col items-center pt-2 space-y-4">
                <Button
                    type="submit"
                    className="mx-auto block h-[48px] w-[200px] rounded-[8px] bg-[#4F5684] text-[16px] font-medium text-white hover:opacity-90"
                    disabled={rawLocal.length < 6}
                >
                    Get code
                </Button>

                <Button variant="bookingGhost" size="booking" type="button" onClick={handleBack}>
                    Back
                </Button>
            </div>
        </form>
    );
}
