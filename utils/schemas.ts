import * as z from 'zod'
import {ZodSchema} from 'zod'

//  공통 검증 메소드
export function validateWithZodSchema<T>(schema: ZodSchema<T>, data: unknown): T {

    const result = schema.safeParse(data);
    /*
        result
        export declare type SafeParseSuccess<Output> = {
            success: true;
            data: Output;
            error?: never;
        };
    */
    if (!result.success) {
        const errors = result.error.errors.map((error) => {
            return error.message;
        })
        throw new Error(errors.join(','))
    }
    return result.data;

}

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
