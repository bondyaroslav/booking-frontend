"use client";
import {useMemo} from "react";
import {addDays, format, isToday} from "date-fns";
import {useBookingStore} from "@/entities/booking/model/store";
import {Card} from "@/components/ui/card";
import {cn} from "@/lib/utils";

type DynDate = {
    day: string;
    value: string;
    calendarDate: string;
    isToday?: boolean;
};

function getNextDays(count = 6): DynDate[] {
    const today = new Date();
    return Array.from({length: count}, (_, i) => {
        const d = addDays(today, i);
        return {
            day: format(d, "EEE").toUpperCase(),
            value: format(d, "d"),
            calendarDate: format(d, "dd.MM"),
            isToday: isToday(d),
        };
    });
}

export default function DateStep() {
    const {date, setDate, setCalendarDate} = useBookingStore();

    const dates = useMemo(() => getNextDays(6), []);

    const handleDateClick = (d: DynDate) => {
        setDate(d.value);
        setCalendarDate(d.calendarDate)
    }

    return (
        <div className="space-y-6">
            <h2 className="font-satoshi font-medium text-[31px] leading-[140%] tracking-[-0.0075em]
                    bg-gradient-to-r from-[#454C6A] to-[#5F6994] bg-clip-text text-transparent"
            >
                Select a date
            </h2>

            <div className="grid grid-cols-3 gap-3">
                {dates.map((d) => {
                    const selected = date === d.value;
                    return (
                        <Card
                            key={`${d.day}-${d.value}`}
                            onClick={() => handleDateClick(d)}
                            data-selected={selected ? "true" : "false"}
                            className={cn(
                                "flex flex-col items-center justify-center max-h-[140px] p-6 rounded-xl border cursor-pointer transition-colors hover:shadow-sm",
                                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                                "data-[selected=true]:text-white data-[selected=true]:border-transparent",
                                "data-[selected=true]:bg-[linear-gradient(180deg,_#454C6A_0%,_#4C567F_25%,_#546094_50%,_#FF8282_100%)]"
                            )}
                        >
                            <div
                                className="
                                    text-xs uppercase tracking-wide opacity-70
                                    data-[selected=true]:opacity-90
                                "
                                data-selected={selected ? "true" : "false"}
                            >
                                {d.day}
                            </div>

                            <div
                                data-selected={selected ? "true" : "false"}
                                className="
                                    font-satoshi font-bold text-[49px] leading-[140%] tracking-[-0.0075em] text-center
                                    bg-clip-text text-transparent
                                    data-[selected=false]:bg-[#454C6A]
                                    data-[selected=true]:bg-[#F3F6FA]
                                "
                            >
                                {d.value}
                            </div>

                            {d.isToday && (
                                <div
                                    data-selected={selected ? "true" : "false"}
                                    className="
                                        mt-1 text-[10px] rounded px-2 py-0.5
                                        bg-[#E8ECF5] text-[#454C6A]
                                        data-[selected=true]:bg-white/20 data-[selected=true]:text-white
                                        "
                                >
                                    today
                                </div>
                            )}
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
