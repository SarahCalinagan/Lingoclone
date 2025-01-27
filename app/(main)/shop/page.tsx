import { FeedWrapper } from "@/components/feadwrap";
import { StickyWrapper } from "@/components/stickywrap";
import { UserProgress } from "@/components/userprog";
import { getUserProgress } from "@/db/queries";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Items } from "./items";

const ShopPage = async () => {
    const userProgressData = getUserProgress();

    const [ userProgress] = await Promise.all([
        userProgressData
    ]);

    if (!userProgress || !userProgress.uactiveCourses) {
        redirect("/courses");
    }

    return (
        <div className="flex flex-row-reverse gap-[48px] px-6">
            <StickyWrapper>
                <UserProgress
                    activeCourse={userProgress.uactiveCourses}
                    hearts={userProgress.hearts}
                    points={userProgress.ponts}
                    hasActiveSub={false}
                />
            </StickyWrapper>
            <FeedWrapper>
                <div className="w-full flex flex-col items-center">
                    <Image 
                        src="/shop.svg"
                        alt="shop"
                        height={90}
                        width={90}
                    />
                    <h1 className="text-center font-bold text-neutral-900 text-2xl my-6">
                        Shop
                    </h1>
                    <p className="text-muted-foreground text-center text-lg mb-6">
                        Spend your Points on Cool Stuff
                    </p>
                    <Items 
                        hearts = {userProgress.hearts}
                        points = {userProgress.ponts}
                        hasActiveSub = {false}
                    />

                </div>
            </FeedWrapper>
        </div>
    );
};

export default ShopPage;