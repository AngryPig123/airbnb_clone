'use server'

import {imageSchema, profileSchema, propertySchema, validateWithZodSchema} from "@/utils/schemas";
import {clerkClient, currentUser} from "@clerk/nextjs/server";
import db from "@/utils/db";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";
import {uploadImage} from "@/utils/supabase";

const getAuthUser = async () => {
    const user = await currentUser();

    // !!user;  //   !! ?? || 문법 뭔지 찾아보자.

    if (!user) {
        throw new Error('You must be logged in to access this route');
    }

    if (!user.privateMetadata.hasProfile) {
        redirect('/profile/create')
    }

    return user;

}

const renderError = (error: unknown): { message: string } => {
    console.log(error)
    return {message: error instanceof Error ? error.message : 'An error occurred'}
}

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
        return renderError(error)
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

    return profile?.profileImage

}

export const fetchProfile = async () => {

    const user = await getAuthUser();
    const profile = await db.profile.findUnique({
        where: {
            clerkId: user.id
        },
    })

    if (!profile) {
        redirect('/profile/create')
    }

    return profile;

}

export const updateProfileAction = async (
    prevState: any, formData: FormData
): Promise<{ message: string }> => {

    const user = await getAuthUser();

    try {

        const rowData = Object.fromEntries(formData);

        const validatedFields = validateWithZodSchema(profileSchema, rowData)

        await db.profile.update({
            where: {
                clerkId: user.id
            },
            data: validatedFields
        })

        revalidatePath('/profile')  //  revalidatePath 뭔지 알아보자.
        return {message: 'Profile updated successfully'}
    } catch (error) {
        return renderError(error)
    }

}

export const updateProfileImageAction = async (
    prevState: any,
    formData: FormData
): Promise<{ message: string }> => {

    const user = await getAuthUser();

    try {
        const image = formData.get('image') as File;
        const validatedFields = validateWithZodSchema(imageSchema, {image: image});
        const fullPath = await uploadImage(validatedFields.image);
        await db.profile.update({
            where: {
                clerkId: user.id
            },
            data: {
                profileImage: fullPath,
            }
        })
        revalidatePath('/profile')  //  서버사이드 컴포넌트에서 바뀐 부분을 고쳐준다.
        return {message: 'Profile image updated successfully'};
    } catch (error) {
        return renderError(error)
    }

}

export const createPropertyAction = async (
    prevState: any,
    formData: FormData
): Promise<{ message: string }> => {

    const user = await getAuthUser();

    try {
        const rowData = Object.fromEntries(formData);
        const validatedFields = validateWithZodSchema(propertySchema, rowData);
        return {message: 'Success create property'};
    } catch (error) {
        return renderError(error);
    }


}










