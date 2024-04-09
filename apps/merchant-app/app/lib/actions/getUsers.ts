'use server'

import prisma from "@repo/db/client";

export const getUsers = async () => {
    const users = await prisma.user.findMany({
        select : {
            id : true,
            name : true,
            number : true,
        }
    });
    return users;
}