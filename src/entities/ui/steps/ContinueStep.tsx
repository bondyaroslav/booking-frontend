import React from 'react';
import {useBookingStore} from "@/entities/booking/model/store";
import {Button} from "@/components/ui/button";
import {IconButton} from "@/entities/ui/IconButton";

const ContinueStep = () => {
    const {step, setStep} = useBookingStore();

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
                Continue your booking
            </h2>
            <p className="text-[#6069A2]">
                How would you like to continue?
            </p>

            <IconButton
                text="Continue with Vipps"
                image={{ src: "/icons/vipps.svg", alt: "Vipps" }}
                onClick={() => setStep(step + 1)}
                data-testid="btn-vipps"
            />
            <IconButton
                text="Continue with Google"
                image={{ src: "/icons/google.svg", alt: "Google" }}
                onClick={() => setStep(step + 1)}
                data-testid="btn-vipps"
            />
            <IconButton
                text="Continue with Phone"
                image={{ src: "/icons/phone.svg", alt: "Phone" }}
                onClick={() => setStep(step + 1)}
                data-testid="btn-vipps"
            />

            <div className="flex justify-center mt-6">
                <Button variant="bookingGhost" size="booking" onClick={() => setStep(3)}>
                    Back
                </Button>
            </div>
        </div>
    );
};

export default ContinueStep;