import { z } from 'https://deno.land/x/zod@v3.21.4/mod.ts'

export const getWordsSchema = z.object({
	name: z.string().min(2).max(50),
	languageId: z.coerce.number().nonnegative(),
})
export type getWords = z.infer<typeof getWordsSchema>

export const getUsersSchema = z.object({
	offset: z.coerce.number().nonnegative().default(0),
	count: z.coerce.number().nonnegative().default(5),
})
export type getUsers = z.infer<typeof getUsersSchema>
