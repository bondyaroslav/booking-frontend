"use client";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {useBookingStore} from "@/entities/booking/model/store";
import GuestStep from "@/entities/ui/steps/GuestStep";
import DateStep from "@/entities/ui/steps/DateStep";
import TimeStep from "@/entities/ui/steps/TimeStep";
import ContinueStep from "@/entities/ui/steps/ContinueStep";
import PhoneStep from "@/entities/ui/steps/PhoneNumberStep";
import CodeConfirmationStep from "@/entities/ui/steps/CodeInformationStep";
import DetailsStep from "@/entities/ui/steps/DetailsStep";
import BookingSummaryStep from "@/entities/ui/steps/BookingSummaryStep";

export default function BookingPage() {
    const {step, setStep, guests, date, calendarDate, time} = useBookingStore();

    const isNextDisabled =
        (step === 1 && !guests) ||
        (step === 2 && !date) ||
        (step === 3 && !time);

    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-50">
            <div className="w-[390px] max-h-[844px] m-4">
                <div className="h-full rounded-2xl bg-white p-6 shadow-md">
                    <div className="m-6 flex justify-center">
                        <Image src="/logo.svg" alt="Logo" width={111} height={33}/>
                    </div>

                    {step === 1 && <GuestStep/>}
                    {step === 2 && <DateStep/>}
                    {step === 3 && <TimeStep/>}
                    {step === 4 && <ContinueStep/>}
                    {step === 5 && <PhoneStep/>}
                    {step === 6 && <CodeConfirmationStep/>}
                    {step === 7 && <DetailsStep/>}
                    {step === 8 && <BookingSummaryStep/>}

                    {step <= 3 && (
                        <div>
                            <div className="mt-6 text-center text-sm text-muted-foreground">
                                Estimated price <br/>
                                <span
                                    className="
                                        font-satoshi
                                        font-bold
                                        text-[31px]
                                        leading-[140%]
                                        tracking-[-0.0075em]
                                        text-center
                                        text-[#454C6A]
                                        "
                                >
                                    650 NOK
                                </span>
                                <div
                                    className="
                                      text-[#454C6A] text-sm font-satoshi
                                      font-bold
                                      text-[16px]
                                      leading-[140%]
                                      tracking-[-0.0075em]
                                      text-center
                                    "
                                >
                                    {guests && <span>{guests} guest</span>}
                                    {time && <span>, {time}</span>}
                                    {date && <span>, {calendarDate}</span>}
                                </div>
                            </div>

                            <div className="mt-6 flex justify-between">
                                <Button
                                    variant="bookingGhost"
                                    size="booking"
                                    onClick={() => setStep(Math.max(1, step - 1))}
                                    disabled={step === 1}
                                >
                                    Back
                                </Button>
                                <Button
                                    variant="bookingPrimaryIcon"
                                    onClick={() => setStep(step + 1)}
                                    disabled={isNextDisabled}
                                >
                                    Next
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
