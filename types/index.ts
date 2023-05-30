import { z } from 'https://deno.land/x/zod@v3.21.4/mod.ts'

export const UserSchema = z.object({
	username: z.string().min(3).max(50),
	password: z.string().min(16).max(32),
})
const User = UserSchema.extend({
	userId: z.number().nonnegative(),
})
export type User = z.infer<typeof User>

export const GrammaticalCategorySchema = z.object({
	name: z.string().min(4).max(12),
})
const GrammaticalCategory = GrammaticalCategorySchema.extend({
	grammaticalCategoryId: z.number(),
})
export type GrammaticalCategory = z.infer<typeof GrammaticalCategory>

export const LanguageSchema = z.object({
	name: z.string().min(5).max(10),
})
const Language = LanguageSchema.extend({
	languageId: z.number().nonnegative(),
})
export type Language = z.infer<typeof Language>

export const WordSchema = z.object({
	name: z.string().min(2).max(50),
	languageId: z.coerce.number().nonnegative(),
	grammaticalCategoryId: z.coerce.number().nonnegative(),
})
const Word = WordSchema.extend({
	wordId: z.number().nonnegative(),
})
export type Word = z.infer<typeof Word>

export const TranslationSchema = z.object({
	wordTranslatedId: z.coerce.number().nonnegative(),
	wordTranslatorId: z.coerce.number().nonnegative(),
})
const Translation = TranslationSchema.extend({
	name: z.string(),
})
export type Translation = z.infer<typeof Translation>
