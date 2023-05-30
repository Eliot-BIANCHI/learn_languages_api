import { Context, Status } from 'https://deno.land/x/oak@v12.4.0/mod.ts'

import { generateError } from '../../tools/index.ts'
import GrammaticalCategories from './GrammaticalCategories.ts'
import { GrammaticalCategory } from '../../types/index.ts'

export async function getGrammaticalCategories(ctx: Context) {
	try {
		const grammaticalCategories: GrammaticalCategory[] = await GrammaticalCategories.getGrammaticalCategories()
		if (grammaticalCategories.length === 0) {
			ctx.response.status = Status.NoContent
		} else {
			ctx.response.status = Status.OK
			ctx.response.body = { data: grammaticalCategories }
		}
	} catch (err) {
		ctx.response.status = Status.InternalServerError
		ctx.response.body = { error: generateError(err.message) }
	}
}

export async function getGrammaticalCategory(ctx: Context) {
	try {
		const grammaticalCategoryId = ctx.state.grammaticalCategoryId as number
		const grammaticalCategory: GrammaticalCategory | null = await GrammaticalCategories.getGrammaticalCategory(
			grammaticalCategoryId,
		)
		if (grammaticalCategory === null) {
			ctx.response.status = Status.NoContent
		} else {
			ctx.response.status = Status.OK
			ctx.response.body = { data: grammaticalCategory }
		}
	} catch (err) {
		ctx.response.status = Status.InternalServerError
		ctx.response.body = { error: generateError(err.message) }
	}
}
