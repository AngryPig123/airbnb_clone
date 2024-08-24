import * as z from 'zod'
import {ZodSchema} from 'zod'

//  데이터 검증 설정
export const profileSchema = z.object({
    // firstName: z.string().max(5,{message:'max length is 5'}),
    // lastName: z.string().max(5,{message:'max length is 5'}),
    // username: z.string().max(5,{message:'max length is 5'}),
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    username: z.string().min(2),
})