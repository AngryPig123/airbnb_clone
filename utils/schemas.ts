import * as z from 'zod'
import {ZodSchema} from 'zod'

/* 공통 검증 부분 */

/*
    result
    export declare type SafeParseSuccess<Output> = {
        success: true;
        data: Output;
        error?: never;
    };
*/
export function validateWithZodSchema<T>(schema: ZodSchema<T>, data: unknown): T {

    const result = schema.safeParse(data);
    if (!result.success) {
        const errors = result.error.errors.map((error) => {
            return error.message;
        })
        throw new Error(errors.join(','))
    }
    return result.data;

}

function validateFile() {
    const maxUploadSize = 1024 * 1024 * 50;
    const acceptedFilesTypes = ['image/'];

    return z.instanceof(File)

        //  refine 가 true 일때 에러가 발생된다.
        .refine((file) => {
            console.log(file)
            return !file || file.size <= maxUploadSize;
        }, 'File size must be less than 50MB')

        .refine((file) => {
            return !file || acceptedFilesTypes.some((type) => {
                return file.type.startsWith(type)
            })
        }, 'File must be an image')

}


/* 데이터 검증 스키마 설정 */

//  데이터 검증 스키마 설정
export const profileSchema = z.object({
    firstName: z.string().min(2, {
        message: 'first name is must be at least 2 characters'
    }),
    lastName: z.string().min(2, {
        message: 'last name is must be at least 2 characters'
    }),
    username: z.string().min(2, {
        message: 'username is must be at least 2 characters'
    }),
})

export const imageSchema = z.object({
    image: validateFile()
})

export const propertySchema = z.object({
    name: z
        .string()
        .min(2, {
            message: 'name must be at least 2 characters.',
        })
        .max(100, {
            message: 'name must be less than 100 characters.',
        }),
    tagline: z
        .string()
        .min(2, {
            message: 'tagline must be at least 2 characters.',
        })
        .max(100, {
            message: 'tagline must be less than 100 characters.',
        }),
    price: z.coerce.number().int().min(0, {
        message: 'price must be a positive number.',
    }),
    category: z.string(),
    description: z.string().refine(
        (description) => {
            const wordCount = description.split(' ').length;
            return wordCount >= 10 && wordCount <= 1000;
        },
        {
            message: 'description must be between 10 and 1000 words.',
        }
    ),
    country: z.string(),
    guests: z.coerce.number().int().min(0, {
        message: 'guest amount must be a positive number.',
    }),
    bedrooms: z.coerce.number().int().min(0, {
        message: 'bedrooms amount must be a positive number.',
    }),
    beds: z.coerce.number().int().min(0, {
        message: 'beds amount must be a positive number.',
    }),
    baths: z.coerce.number().int().min(0, {
        message: 'bahts amount must be a positive number.',
    }),
    amenities: z.string(),
});
