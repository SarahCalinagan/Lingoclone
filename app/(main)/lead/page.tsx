import { FeedWrapper } from "@/components/feadwrap";
import { StickyWrapper } from "@/components/stickywrap";
import { UserProgress } from "@/components/userprog";
import { getUserProgress, getUserSubscription } from "@/db/queries";
import Image from "next/image";
import { redirect } from "next/navigation";

const LeaderboardPage = async () => {
    const userProgressData = getUserProgress();
    const userSubscriptionData = getUserSubscription();

    const [ userProgress, userSubscription] = await Promise.all([
        userProgressData,
        userSubscriptionData
    ]);

    if (!userProgress || !userProgress.uactiveCourses) {
        redirect("/courses");
    }

    const isPro = !!userSubscription?.isActive;

    return (
        <div className="flex flex-row-reverse gap-[48px] px-6">
            <StickyWrapper>
                <UserProgress
                    activeCourse={userProgress.uactiveCourses}
                    hearts={userProgress.hearts}
                    points={userProgress.ponts}
                    hasActiveSub={isPro}
                />
            </StickyWrapper>
            <FeedWrapper>
                <div className="w-full flex flex-col items-center">
                    <Image 
                        src="/leaderboard.svg"
                        alt="leaderboard"
                        height={90}
                        width={90}
                    />
                    <h1 className="text-center font-bold text-neutral-900 text-2xl my-6">
                        Leaderboard
                    </h1>
                    <p className="text-muted-foreground text-center text-lg mb-6">
                        See where you stand among other learners in the community.
                    </p>
                    {/*to do */}

                </div>
            </FeedWrapper>
        </div>
    );
};

export default LeaderboardPage;