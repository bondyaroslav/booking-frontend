"use client";
import {useBookingStore} from "@/entities/booking/model/store";
import {Card} from "@/components/ui/card";
import {cn} from "@/lib/utils";

const options = [1, 2, 3, 4, 5] as const;

export default function GuestStep() {
    const {guests, setGuests} = useBookingStore();

    return (
        <div className="space-y-6">
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
                Select guests
            </h2>

            <div className="grid grid-cols-3 gap-3">
                {options.map((opt) => {
                    const selected = guests === opt;
                    return (
                        <Card
                            key={opt}
                            onClick={() => setGuests(opt)}
                            data-selected={selected ? "true" : "false"}
                            className={cn(
                                "flex flex-col justify-center items-center max-h-[140px] p-12 rounded-xl border cursor-pointer transition-colors hover:shadow-sm",
                                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                                "data-[selected=true]:text-white data-[selected=true]:border-transparent",
                                "data-[selected=true]:bg-[linear-gradient(180deg,_#454C6A_0%,_#4C567F_25%,_#546094_50%,_#FF8282_100%)]"
                            )}
                        >
                            <div
                                data-selected={guests === opt ? "true" : "false"}
                                className="
                                    font-satoshi font-bold text-[49px] leading-[140%] tracking-[-0.0075em] text-center bg-clip-text text-transparent
                                    data-[selected=false]:bg-[#454C6A]
                                    data-[selected=true]:bg-[#F3F6FA]
                                "
                            >
                                {opt === 5 ? "5+" : opt}
                            </div>
                            <div className="mt-2 text-lg">{opt === 1 ? "guest" : "guests"}</div>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
