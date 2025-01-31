import { auth } from "@clerk/nextjs/server";

const allowedIds = [
    "user_2sL7k5uCPUZjv22DlkMFG0z9JZ4",
];

export const isAdmin = () => {
    return auth().then(({ userId }) => {
        if (!userId) {
            return false;
        }

        return allowedIds.indexOf(userId) !== -1;
    });
};