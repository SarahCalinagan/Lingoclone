import { FeedWrapper } from "@/components/feadwrap";
import { StickyWrapper } from "@/components/stickywrap";
import { Header } from "./header";
import { UserProgress } from "@/components/userprog";
import { getUnits, getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";
import { Unit } from "./unit";

const LearnPage = async () => {
    const userProgressdata = getUserProgress();
    const unitsData = getUnits();

    const[
        userProgress,
        units
    ] = await Promise.all([
        userProgressdata,
        unitsData
    ]);

    if (!userProgress || !userProgress.uactiveCourses) {
        redirect("/courses");
    }

    return (
        <div className="flex flex-row-reverse gap-[48px] px-6">
           <StickyWrapper>
            <UserProgress activeCourse={userProgress.uactiveCourses} 
            hearts={userProgress.hearts} 
            points={userProgress.ponts} 
            hasActiveSub={false}/>
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
                        activeLesson={undefined}
                        activeLessonPercentage={0}/>
                    </div>
                ))}
           </FeedWrapper>
        </div>
    );
};

export default LearnPage;