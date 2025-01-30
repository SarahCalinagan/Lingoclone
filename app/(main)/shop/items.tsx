"use client";

import { refillHearts } from "@/actions/user-progress";
import { createStripeUrl } from "@/actions/usersub";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useTransition } from "react";
import { toast } from "sonner";
import { POINT_REFILL } from "@/constants";


type Props = {
    hearts: number;
    points: number;
    hasActiveSub: boolean;
};

export const Items = ({
    hearts, points, hasActiveSub,
}: Props) => {
    const [pending, startTansition] = useTransition();

    const onRefillHearts = () => {
        if (pending || hearts === 5 || points < POINT_REFILL) {
            return;
        }

        startTansition(() => {
            refillHearts()
            .catch(() => toast.error("Something went wrong in shop. sala ni dave"));
            
        });
    };

    const onUpgrade = () => {
        startTansition (() => {
            createStripeUrl()
            .then((response) => {
                if (typeof response.data === 'string') {
                    window.location.href = response.data;
                } else {
                    toast.error("Invalid response data. sala ni dave");
                }
            })
            .catch(() => toast.error("Something went wrong"));
        });
    };
    /*
    old
    const onUpgrade = () => {
        startTansition (() => {
            createStripeUrl()
            .then((response) => {
                if (response.data) {
                    window.location.href = response.data;
                }
            })
            .catch(() => toast.error("Something went wrong"));
        });
    };*/
    //wala lang

    return (
        <ul className="w-full">
            <div className="flex items-center w-full p-4 gap-x-4 border-t-2">
                <Image 
                    src="/heart.svg"
                    alt="heart"
                    height={60}
                    width={60}
                />
                <div className="flex-1">
                    <p className="text-neutral-700 text-base lg:text-xl font-bold">
                        Refill hearts
                    </p>
                </div>
                <Button
                    onClick={onRefillHearts}
                    disabled={pending || hearts === 5 || points < POINT_REFILL}
                >
                    {hearts === 5
                    ? "full" : (
                        <div className="flex items-center">
                            <Image
                                src="/point.svg"
                                alt="points"
                                height={20}
                                width={20}
                            />
                            <p>10</p>
                        </div>
                    )}
                </Button>
            </div>
            <div className="flex items-center w-full p-4 pt-8 gap-x-4 border-t-2">
                <Image
                    src="/unlimited.svg"
                    alt="unlimited"
                    height={60}
                    width={60}
                />
                <div className="flex-1">
                    <p className="text-neutral-700 text-base lg:text-xl font-bold">
                        Unlimited Hearts
                    </p>
                </div>
                <Button
                onClick={onUpgrade}
                    disabled={pending}
                >
                    {hasActiveSub ? "settings" : "upgrade"}
                </Button>
            </div>
        </ul>
    );
};