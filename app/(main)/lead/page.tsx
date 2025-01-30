import { FeedWrapper } from "@/components/feadwrap";
import { StickyWrapper } from "@/components/stickywrap";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { UserProgress } from "@/components/userprog";
import { getTopTenUsers, getUserProgress, getUserSubscription } from "@/db/queries";
import Image from "next/image";
import { redirect } from "next/navigation";

const LeaderboardPage = async () => {
    const userProgressData = getUserProgress();
    const userSubscriptionData = getUserSubscription();
    const leaderboardData = getTopTenUsers();

    const [ userProgress, userSubscription, leaderboard] = await Promise.all([
        userProgressData,
        userSubscriptionData,
        leaderboardData
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
                    <Separator className="mb-4 h-0.5 rounded-full"/>
                    {leaderboard.map((userProgress, index)=> (
                      <div key={userProgress.userId}
                      className="flex items-center w-full p-2 px-4 rounded-xl hover:bg-gray-200/50">
                        <p className="font-bold text-sky-700 mr-4">
                            {index + 1}
                        </p>
                        <Avatar
                            className="border bg-sky-300 h-12 w-12 ml-3 mr-6"
                        >
                            <AvatarImage
                                className="object-cover"
                                src={userProgress.userImageSrc}
                            />
                        </Avatar>
                        <p className="font-bold text-neutral-800 flex-1">
                            {userProgress.userName}
                        </p>
                        <p className="text-muted-foreground">
                            {userProgress.ponts} XP
                        </p>
                      </div> 
                    ))}
                
                </div>
            </FeedWrapper>
        </div>
    );
};

export default LeaderboardPage;