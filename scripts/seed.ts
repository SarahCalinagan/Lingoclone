import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql, {schema});

const main = async () => {
    try{
        console.log("Seeding database");

        await db.delete(schema.courses);
        await db.delete(schema.userProgress);
        await db.delete(schema.units);
        await db.delete(schema.lessons);
        await db.delete(schema.challengeOptions);
        await db.delete(schema.challengeProgress);

        await db.insert(schema.courses).values([
            {
                id: 1,
                title: "Spanish",
                imageSrc: "/es.svg",
            },
            {
                id: 2,
                title: "Japanese",
                imageSrc: "/jp.svg",
            },
            {
                id: 3,
                title: "Italian",
                imageSrc: "/it.svg",
            },
        ]);

//units

        await db.insert(schema.units).values([
            {
                id: 1,
                courseId: 2,
                title: "Unit 1",
                description: "Basics of Japanese - Foods",
                order: 1,
            },
            {
                id: 2,
                courseId: 2,
                title: "Unit 2",
                description: "Basics of Japanese - Numbers",
                order: 2,
            },
        ]);

//lessons per unit

        await db.insert(schema.lessons).values([
            {
                id: 1,
                unitId: 1,
                title: "Foods",
                order: 1,
            },
            {
                id: 2,
                unitId: 1,
                title: "Foods",
                order: 2,
            },
            {
                id: 3,
                unitId: 1,
                title: "Foods",
                order: 3,
            },
            {
                id: 4,
                unitId: 1,
                title: "Foods",
                order: 4,
            },
            
        ]);

        await db.insert(schema.lessons).values([
            {
                id: 5,
                unitId: 2,
                title: "Numbers",
                order: 1,
            },
            {
                id: 6,
                unitId: 2,
                title: "Numbers",
                order: 2,
            },
            {
                id: 7,
                unitId: 2,
                title: "Numbers",
                order: 3,
            },
            {
                id: 8,
                unitId: 2,
                title: "Numbers",
                order: 4,
            },
            
        ]);

//challenges per lesson

        await db.insert(schema.challenges).values([
            {
                id: 1,
                lessonId: 1,
                type: "SELECT",
                order: 1,
                question: ' Select the Word "Water".',
            },
            {
                id: 2,
                lessonId: 1,
                type: "ASSIST",
                order: 2,
                question: '"Sushi"',
            },
            {
                id:3,
                lessonId: 2,
                type: "SELECT",
                order: 3,
                question: ' Select the Word "Soba".',
            },
            {
                id: 4,
                lessonId: 2,
                type: "ASSIST",
                order: 4,
                question: '"Its Sushi."',
            },
            
        ]);

        

        await db.insert(schema.challenges).values([
            {
                id: 5,
                lessonId: 3,
                type: "SELECT",
                order: 1,
                question: ' Select the Word "Sushi".',
            },
            {
                id: 6,
                lessonId: 3,
                type: "ASSIST",
                order: 2,
                question: '"Sushi"',
            },
            {
                id: 7,
                lessonId: 4,
                type: "SELECT",
                order: 3,
                question: ' Select the Word "Soba".',
            },
            
        ]);

//challenge options
//lesson 1 unit 1

        await db.insert(schema.challengeOptions).values([
            {
                challengId: 1,
                imageSrc: "/water.svg",
                correct: true,
                text: "ミズ",
                audioSrc: "/jp_water.mp3",
            },
            {
                challengId: 1,
                imageSrc: "/soba.svg",
                correct: false,
                text: "ソバ",
                audioSrc: "/jp_soba.mp3",
            },
            {
                challengId: 1,
                imageSrc: "/sushi.svg",
                correct: false,
                text: "すし",
                audioSrc: "/jp_sushi.mp3",
            },
            
        ]);

        await db.insert(schema.challengeOptions).values([
            {
                challengId: 2,
                correct: false,
                text: "ミズ",
                audioSrc: "/jp_water.mp3",
            },
            {
                challengId: 2,
                correct: false,
                text: "ソバ",
                audioSrc: "/jp_soba.mp3",
            },
            {
                challengId: 2,
                correct: true,
                text: "すし",
                audioSrc: "/jp_sushi.mp3",
            },
            
        ]);

        await db.insert(schema.challengeOptions).values([
            {
                challengId: 3,
                imageSrc: "/water.svg",
                correct: false,
                text: "ミズ",
                audioSrc: "/jp_water.mp3",
            },
            {
                challengId: 3,
                imageSrc: "/soba.svg",
                correct: true,
                text: "ソバ",
                audioSrc: "/jp_soba.mp3",
            },
            {
                challengId: 3,
                imageSrc: "/sushi.svg",
                correct: false,
                text: "すし",
                audioSrc: "/jp_sushi.mp3",
            },
            
        ]);

        await db.insert(schema.challengeOptions).values([
            {
                challengId: 4,
                correct: false,
                text: "ミズ です",
                audioSrc: "/jp_itswater.mp3",
            },
            {
                challengId: 4,
                correct: false,
                text: "ソバ です",
                audioSrc: "/jp_itssoba.mp3",
            },
            {
                challengId: 4,
                correct: true,
                text: "すし です",
                audioSrc: "/jp_itssushi.mp3",
            },
            
        ]);

//lesson 2 unit 

        await db.insert(schema.challengeOptions).values([
            {
                challengId: 5,
                imageSrc: "/water.svg",
                correct: false,
                text: "ミズ",
                audioSrc: "/jp_water.mp3",
            },
            {
                challengId: 5,
                imageSrc: "/soba.svg",
                correct: false,
                text: "ソバ",
                audioSrc: "/jp_soba.mp3",
            },
            {
                challengId: 5,
                imageSrc: "/sushi.svg",
                correct: true,
                text: "すし",
                audioSrc: "/jp_sushi.mp3",
            },
            
        ]);

        console.log("Seeding Finished");
    }catch(error){
        console.error(error);
        throw new Error("Failed to seed the database");

    }
};

main();