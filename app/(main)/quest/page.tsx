import { FeedWrapper } from "@/components/feadwrap";
import { Promo } from "@/components/promo";
import { StickyWrapper } from "@/components/stickywrap";
import { Progress } from "@/components/ui/progress";
import { UserProgress } from "@/components/userprog";
import { quest } from "@/constants";
import { getUserProgress, getUserSubscription } from "@/db/queries";
import Image from "next/image";
import { redirect } from "next/navigation";

const QuestPage = async () => {
    const userProgressData = getUserProgress();
    const userSubscriptionData = getUserSubscription();

    const [ userProgress, userSubscription,] = await Promise.all([
        userProgressData,
        userSubscriptionData,
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
                {!isPro && (
                <Promo />
            )}
            </StickyWrapper>
            <FeedWrapper>
                <div className="w-full flex flex-col items-center">
                    <Image 
                        src="/quests.svg"
                        alt="quest"
                        height={90}
                        width={90}
                    />
                    <h1 className="text-center font-bold text-neutral-900 text-2xl my-6">
                        Quest
                    </h1>
                    <p className="text-muted-foreground text-center text-lg mb-6">
                        Complete Quest by earning points.
                    </p>
                    
                    <ul className="w-full">
                        {quest.map((quest) =>{
                            const progress = (userProgress.ponts / quest.value) * 100;

                            return (
                                <div
                                className="flex items-center w-full p-4 gap-x-4 border-t-2"
                                key={quest.title}
                                >
                                    <Image
                                    src="/point.svg"
                                    alt="Points"
                                    width={60}
                                    height={60}
                                    />
                                    <div className="flex flex-col gap-y-2 w-full">
                                        <p className="text-neutral-700 text-xl font-bold">
                                            {quest.title}
                                        </p>
                                        <Progress value={progress} className="h-3"/>
                                    </div>

                                </div>
                            )
                        })}
                    </ul>
                
                </div>
            </FeedWrapper>
        </div>
    );
};

export default QuestPage;