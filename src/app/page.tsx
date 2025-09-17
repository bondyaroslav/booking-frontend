"use client";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import * as React from "react";

export default function Home() {
    const router = useRouter();

    const handleClick = () => {
        router.push("/booking");
    };

    return (
        <div className="max-w-sm mx-auto p-4 space-y-3">
            <Button
                variant="bookingPrimary"
                className="mx-auto block h-[48px] w-[200px] rounded-[8px] bg-[#4F5684] text-[16px] font-medium text-white hover:opacity-90"
                onClick={() => {handleClick()}}
            >
                Go to booking
            </Button>
        </div>
    );
}
