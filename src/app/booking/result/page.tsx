"use client"
import React from 'react';
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";

const Page = () => {
    const router = useRouter();

    const handleClick = () => {
        router.push("/booking");
    };

    return (
        <main className="flex flex-col items-center w-full h-screen justify-center">
            <div
                className="w-[390px] max-h-[844px] h-full m-4 rounded-2xl bg-white p-6 shadow-md pb-24
                   flex flex-col justify-between"
                style={{
                    background: "url('/background.svg') bottom center / 100% auto no-repeat",
                }}
            >
                <div className="m-6 flex justify-center">
                    <Image src="/logo.svg" alt="Logo" width={111} height={33}/>
                </div>

                <div className="flex flex-col justify-center items-center flex-grow">
                    <Image
                        src="/status_codes/200.svg"
                        alt="200"
                        width={73}
                        height={73}
                        priority
                    />
                    <h1
                        className="text-center font-bold text-[31px] leading-[140%] tracking-[-0.0075em]
                       bg-gradient-to-r from-[#4F5684] to-[#FF8282] bg-clip-text text-transparent mt-4"
                    >
                        Booking confirmed!
                    </h1>
                    <p
                        className="text-center font-normal text-[16px] leading-[140%] tracking-[-0.0075em]
                       text-[#6069A2] mt-2 mb-6"
                    >
                        Thank you for using our service
                    </p>
                    <Button
                        variant="bookingGhost"
                        onClick={handleClick}
                    >
                        Back
                    </Button>
                </div>
            </div>
        </main>
    );
};

export default Page;
