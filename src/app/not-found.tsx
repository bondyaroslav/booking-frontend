"use client"
import Image from "next/image";
import {Button} from "@/components/ui/button";
import React from "react";
import {useRouter} from "next/navigation";

export default function NotFound() {
    const router = useRouter();

    const handleClick = () => {
        router.push("/booking");
    };

    return (
        <main className="flex flex-col items-center w-full h-screen justify-center">
            <div
                className="w-[390px] max-h-[844px] h-full m-4 rounded-2xl bg-white p-6 shadow-md pb-24
                    flex flex-col justify-between"
                    style={{background: "url('/background.svg') bottom center / 100% auto no-repeat",}}
            >
                <div className="m-6 flex justify-center">
                    <Image src="/logo.svg" alt="Logo" width={111} height={33}/>
                </div>

                <div className="flex flex-col justify-center items-center flex-grow">
                    <Image
                        src="/status_codes/404.svg"
                        alt="404"
                        width={73}
                        height={73}
                        priority
                    />
                    <h1
                        className="text-center font-bold text-[31px] leading-[140%] tracking-[-0.0075em]
                       bg-gradient-to-r from-[#4F5684] to-[#FF8282] bg-clip-text text-transparent mt-4"
                    >
                        404 – Page not found
                    </h1>
                    <p
                        className="text-center font-normal text-[16px] leading-[140%] tracking-[-0.0075em]
                       text-[#6069A2] mt-2 mb-6"
                    >
                        Looks like this page doesn’t exist.
                    </p>
                    <Button
                        variant="bookingGhost"
                        onClick={handleClick}
                    >
                        Go back
                    </Button>
                </div>
            </div>
        </main>
    )
}