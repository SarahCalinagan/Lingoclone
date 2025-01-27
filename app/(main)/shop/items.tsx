"use client";

import { refillHearts } from "@/actions/user-progress";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useTransition } from "react";
import { toast } from "sonner";

const POINT_REFILL = 10;

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
            .catch(() => toast.error("Something went wron in shop"));
            
        });
    };
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
        </ul>
    );
};