'use server';
import * as z from 'zod';
import { db } from '@/lib/prisma';
import { editradePostSchema } from '@/types/types';
import { revalidatePath } from 'next/cache';
import {undefined} from "zod";

export const editTradePost = async (formData: FormData) => {
    const profileId = formData.get('profileId');
    const userId = formData.get('userId');
    const title = formData.get('title');
    const image = formData.get('image');
    const description = formData.get('description');
    const price = formData.get('price');
    const postType = formData.get('postType');

    await db.tradePost.update({
        data: {
            profileId: profileId as string,
            userId: userId as string,
            title: title as string,
            image: image as string,
            description: description as string,
            price: price as string,
            postType:postType as string,
        }
    });

    revalidatePath(`/profile/${profileId}`); // profile check for data change and reloads

    return {
        success: true,
    };
};