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

        await db.insert(schema.units).values([
            {
                id: 1,
                courseId: 2,
                title: "Unit 1",
                description: "Basics of Japanese",
                order: 1,
            },
        ]);

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
                title: "Numbers",
                order: 2,
            },
            {
                id: 3,
                unitId: 1,
                title: "Numbers",
                order: 3,
            },
            {
                id: 4,
                unitId: 1,
                title: "Foods",
                order: 4,
            },
            
        ]);

        await db.insert(schema.challenges).values([
            {
                id: 1,
                lessonId: 1,
                type: "SELECT",
                order: 1,
                question: ' Select the Word "Water".',
            },
            
        ]);

        await db.insert(schema.challengeOptions).values([
            {
                id: 1,
                challengId: 1,
                imageSrc: "/water.svg",
                correct: true,
                text: "mizu",
                audioSrc: "/jp_water.mp3",
            },
            {
                id: 2,
                challengId: 1,
                imageSrc: "/soba.svg",
                correct: false,
                text: "soba",
                audioSrc: "/jp_soba.mp3",
            },
            {
                id: 3,
                challengId: 1,
                imageSrc: "/sushi.svg",
                correct: false,
                text: "sushi",
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