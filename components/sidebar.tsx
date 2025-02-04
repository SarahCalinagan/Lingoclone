import { cn } from "@/lib/utils"
import Image from "next/image";
import Link from "next/link";
import {SidebarItem} from "./Side-item";
import {ClerkLoaded, ClerkLoading, UserButton} from "@clerk/nextjs"
import { Loader } from "lucide-react";

type Props = {
    className?: string;
};

export const Sidebars = ({ className }: Props ) => {
    return (
        <div className={cn("flex h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col", 
        className,
        )}>
            <Link href="/learn">
            <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
                    <Image src="/mascot.svg" height={40} width={40} alt="Mascot"/>
                    <h1 className="text-2xl font-extrabold text-sky-600 tracking-wide">
                    RippleLearn
                    </h1>
                </div>
            </Link>
            <div className=" flex flex-col gap-y-2 flex-1">
                <SidebarItem label="Learn" href="/learn" iconSrc="/learn.svg"/>
                <SidebarItem label="Shop" href="/shop" iconSrc="/shop.svg"/>
                <SidebarItem label="Quest" href="/quest" iconSrc="/quests.svg"/>
                <SidebarItem label="Leaderboard" href="/lead" iconSrc="/leaderboard.svg"/>
            </div>
            <div className="p-4">
                <ClerkLoading>
                    <Loader className="h-5 w-5 text-muted-foreground animate-spin"/>
                </ClerkLoading>
                <ClerkLoaded>
                    <UserButton/>
                </ClerkLoaded>
            </div>
        </div>
    );
};