"use client";
import {useBookingStore} from "@/entities/booking/model/store";
import {Card} from "@/components/ui/card";
import {cn} from "@/lib/utils";

const times = ["10:00", "12:00", "14:00", "16:00", "18:00", "20:00"] as const;

const TimeStep = () => {
    const {time, setTime} = useBookingStore();

    return (
        <div className="space-y-6">
            <h2
                className="
                  font-satoshi font-medium text-[31px] leading-[140%] tracking-[-0.0075em]
                  bg-gradient-to-r from-[#454C6A] to-[#5F6994] bg-clip-text text-transparent
                "
            >
                Select time
            </h2>

            <div className="grid grid-cols-3 gap-3">
                {times.map((t) => {
                    const selected = time === t;
                    return (
                        <Card
                            key={t}
                            onClick={() => setTime(t)}
                            data-selected={selected ? "true" : "false"}
                            className={cn(
                                "h-[120px] rounded-xl border cursor-pointer transition-colors hover:shadow-sm",
                                "flex items-center justify-center px-4",
                                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                                "data-[selected=true]:text-white data-[selected=true]:border-transparent",
                                "data-[selected=true]:bg-[linear-gradient(180deg,_#454C6A_0%,_#4C567F_25%,_#546094_50%,_#FF8282_100%)]"
                            )}
                        >
              <span
                  data-selected={selected ? "true" : "false"}
                  className="
                  font-satoshi font-bold text-[16px] leading-[140%] tracking-[-0.0075em] text-center
                  bg-clip-text text-transparent
                  data-[selected=false]:bg-[#454C6A]
                  data-[selected=true]:bg-[#F3F6FA]
                "
              >
                {t}
              </span>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}

export default TimeStep;
