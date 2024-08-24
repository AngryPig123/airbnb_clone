'use server'

import {profileSchema} from "@/utils/schemas";
import {clerkClient, currentUser} from "@clerk/nextjs/server";
import db from "@/utils/db";
import {redirect} from "next/navigation";

//  실제 데이터 전송 전 zod 를 이용한 데이터 검증.
export const createProfileAction = async (prevState: any, formData: FormData) => {

    try {

        const user = await currentUser();
        if (!user) throw new Error('Please login to create a profile');
        const rowData = Object.fromEntries(formData);
        const validatedFields = profileSchema.parse(rowData);

        await db.profile.create({
            data: {
                clerkId: user.id,
                email: user.emailAddresses[0].emailAddress,
                profileImage: user.imageUrl ?? '',
                ...validatedFields,
            }
        })

        await clerkClient().users.updateUserMetadata(user.id, {
            privateMetadata: {
                hasProfile: true,
            }
        })

    } catch (error) {
        return {message: error instanceof Error ? error.message : 'An error occurred'}
    }

    redirect('/')

}


export const fetchProfileImage = async () => {
    const user = await currentUser();
    if (!user) {
        return null;
    }

    const profile = await db.profile.findUnique({
        where: {
            clerkId: user.id
        },
        select: {
            profileImage: true
        }
    });

    if (!profile) {
        return null;
    }

    return profile.profileImage

}








