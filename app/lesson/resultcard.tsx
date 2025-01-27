import { cn } from "@/lib/utils";
import Image from "next/image";


type Props = {
    value: number;
    variant: "points" | "hearts";
}

export const RersultCard = ({ value, variant}: Props) => {
    const imageSrc = variant === "hearts" ? "/heart.svg" : "/point.svg";

    return (
        <div className={cn(
            "rounded-2xl border-2 w-full",
            variant === "points" && "bg-sky-500 border-sky-500",
            variant === "hearts" && "bg-rose-500 border-rose-500",
        )}>
            <div className={cn(
                "p-1.5 text-white rounded-t-xl font-bold text-center uppercase text-xs",
                variant === "hearts" && "bg-rose-500",
                variant === "points" && "bg-sky-500",
            )}>
                {variant === "hearts" ? "Hearts Left" : "Total XP"}
            </div>
            <div className={cn(
                "rounded-2xl bg-white items-center flex justify-center p-6 font-bold text-lg",
                variant === "hearts" && "text-rose-500",
                variant === "points" && "text-sky-500",
            )}>
                <Image
                    alt="icon"
                    src={imageSrc}
                    height={30}
                    width={30}
                    className="mr-1.5"
                />
                {value}
            </div>
        </div>
    );
};