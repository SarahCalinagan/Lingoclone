"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const Promo = () => {
    return (
        <div className="border-2 rounded-xl p-4 space-y-4">
            <div className="space-y-2">
                <div className="flex items-center gap-x-2">
                    <Image
                    src="/unlimited.svg"
                    alt="pro"
                    height={26}
                    width={26}
                    />
                    <h3 className="font-bold text-lg">
                        Updgrade to Pro
                    </h3>
                </div>
                <p className="text-muted-foreground">
                    Get unlimited Hearts and more.
                </p>
            </div>
            
            <Button
            asChild
            variant="super"
            className="w-full"
            size="lg">
                <Link href="/shop">
                Upgrade Now
                </Link>
            </Button>
            
        </div>
    );
};