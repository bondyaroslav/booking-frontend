"use client"
import React from "react";
import {useBookingStore} from "@/entities/booking/model/store";
import {Button} from "@/components/ui/button";
import {IconButton} from "@/entities/ui/IconButton";
import {createCheckout} from "@/lib/payments";
import {loadStripe} from "@stripe/stripe-js";

type CheckoutResponse = {
    checkoutUrl?: string;
    sessionId?: string;
};

const BookingSummaryStep = () => {
    const {calendarDate, time, guests, step, setStep, bookingId, email} = useBookingStore();
    const [loading, setLoading] = React.useState<null | "vipps" | "card" | "bank" | "stripe">(null);
    const [error, setError] = React.useState<string | null>(null);

    const pay = async (method: "vipps" | "card" | "bank" | "stripe") => {
        try {
            setError(null);
            setLoading(method);

            if (!bookingId) throw new Error("bookingId is missing");
            if (!email) throw new Error("customerEmail is missing");

            const resp = (await createCheckout({
                bookingId,
                amountCents: 50,
                currency: "usd",
                name: "Booking payment",
                customerEmail: email,
                method,
            })) as CheckoutResponse;

            if (typeof resp.checkoutUrl === "string" && resp.checkoutUrl.length > 0) {
                window.location.assign(resp.checkoutUrl);
                return;
            }

            if (typeof resp.sessionId === "string" && resp.sessionId.length > 0) {
                const pk = process.env.NEXT_PUBLIC_STRIPE_PK;
                if (!pk) throw new Error("Stripe public key is missing (NEXT_PUBLIC_STRIPE_PK)");
                const stripe = await loadStripe(pk);
                if (!stripe) throw new Error("Failed to load Stripe.js");

                const result = await stripe.redirectToCheckout({sessionId: resp.sessionId});
                if (result.error) throw new Error(result.error.message);
                return;
            }

            throw new Error("No checkoutUrl or sessionId returned");
        } catch (e: unknown) {
            const message = e instanceof Error ? e.message : String(e);
            setError(message ?? "Payment error");
        } finally {
            setLoading(null);
        }
    };

    const isBusy = loading !== null;

    return (
        <div>
            <h2
                className="
          font-satoshi font-medium text-[31px] leading-[140%] tracking-[-0.0075em]
          align-middle bg-gradient-to-r from-[#454C6A] to-[#5F6994] bg-clip-text text-transparent
        "
            >
                Booking summary
            </h2>

            <div className="space-y-2 py-4 text-[#6069A2] text-[16px] leading-[150%]">
                <p>
                    <span className="opacity-70">Product: </span>
                    <span className="font-medium">Sauna session (Grimen sauna)</span>
                </p>
                <p>
                    <span className="opacity-70">Date: </span>
                    <span className="font-medium">{calendarDate}</span>
                </p>
                <p>
                    <span className="opacity-70">Time: </span>
                    <span className="font-medium">{time}</span>
                </p>
                <p>
                    <span className="opacity-70">Guests: </span>
                    <span className="font-medium">{guests}</span>
                </p>
            </div>

            <div className="text-center">
                <div className="font-satoshi text-[40px] font-bold leading-[140%] tracking-[-0.0075em] text-[#454C6A]">
                    650 NOK
                </div>
                <div className="text-sm text-[#454C6A]/70">inkl. MVA</div>
            </div>

            {error && (
                <div className="mt-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                    {error}
                </div>
            )}

            <div className="min-h-full space-y-2 text-[#6069A2] text-[16px] leading-[150%] mt-3">
                <IconButton
                    text={loading === "vipps" ? "Processing…" : "Pay now with Vipps"}
                    image={{src: "/icons/vipps.svg", alt: "Vipps"}}
                    onClick={() => pay("vipps")}
                    data-testid="btn-vipps"
                    className={isBusy ? "pointer-events-none opacity-60" : undefined}
                />
                <IconButton
                    text={loading === "card" ? "Processing…" : "Credit / Debit Card"}
                    image={{src: "/icons/card.svg", alt: "Card"}}
                    onClick={() => pay("card")}
                    data-testid="btn-card"
                    className={isBusy ? "pointer-events-none opacity-60" : undefined}
                />
                <IconButton
                    text={loading === "bank" ? "Processing…" : "Bank transfer"}
                    image={{src: "/icons/bank.svg", alt: "Bank"}}
                    onClick={() => pay("bank")}
                    data-testid="btn-bank"
                    className={isBusy ? "pointer-events-none opacity-60" : undefined}
                />
                <IconButton
                    text={loading === "stripe" ? "Redirecting…" : "Continue with Stripe"}
                    image={{src: "/icons/stripe.svg", alt: "Stripe"}}
                    onClick={() => pay("stripe")}
                    data-testid="btn-stripe"
                    className={isBusy ? "pointer-events-none opacity-60" : undefined}
                />
            </div>

            <div className="flex justify-center mt-6">
                <Button
                    variant="bookingGhost"
                    size="booking"
                    type="button"
                    onClick={() => setStep(step - 1)}
                    disabled={isBusy}
                >
                    Back
                </Button>
            </div>
        </div>
    );
};

export default BookingSummaryStep;
