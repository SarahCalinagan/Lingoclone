import { FeedWrapper } from "@/components/feadwrap";
import { StickyWrapper } from "@/components/stickywrap";
import { Header } from "./header";
import { UserProgress } from "@/components/userprog";
import { getCourseProgress, getLessonPercentage, getUnits, getUserProgress, getUserSubscription } from "@/db/queries";
import { redirect } from "next/navigation";
import { Unit } from "./unit";
import { lessons, units as unitsSchema } from "@/db/schema";
import { Promo } from "@/components/promo";
import { Quests } from "@/components/quests";

const LearnPage = async () => {
    const userProgressData = getUserProgress();
    const courseProgressData = getCourseProgress();
    const lessonPercentageData = getLessonPercentage();
    const unitsData = getUnits();
    const userSubscriptionData = getUserSubscription();

    const[
        userProgress,
        units,
        courseProgress,
        lessonPercentage,
        userSubscription,
    ] = await Promise.all([
        userProgressData,
        unitsData,
        courseProgressData,
        lessonPercentageData,
        userSubscriptionData,
    ]);

    if (!userProgress || !userProgress.uactiveCourses) {
        redirect("/courses");
    }

    if (!courseProgress) {
        redirect("/courses");
    }

    const isPro = !!userSubscription?.isActive;

    return (
        <div className="flex flex-row-reverse gap-[48px] px-6">
           <StickyWrapper>
            <UserProgress activeCourse={userProgress.uactiveCourses} 
            hearts={userProgress.hearts} 
            points={userProgress.ponts} 
            hasActiveSub={isPro}/>
            {!isPro && (
                <Promo />
            )}
            <Quests points={userProgress.ponts}/>
           </StickyWrapper>
           <FeedWrapper>
                <Header title={userProgress.uactiveCourses.title}/>
                {units.map((unit) => (
                    <div key={unit.id} className="mb-10">
                        <Unit 
                        id={unit.id}
                        order={unit.order}
                        description={unit.description}
                        title={unit.title}
                        lessons={unit.lessons}
                        activeLesson={courseProgress.activeLesson as typeof lessons.$inferSelect & {
                            unit: typeof unitsSchema.$inferSelect;
                        } | undefined}
                        activeLessonPercentage={lessonPercentage}/>
                    </div>
                ))}
           </FeedWrapper>
        </div>
    );
};

export default LearnPage;