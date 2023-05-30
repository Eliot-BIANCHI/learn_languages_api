import { Context, Status } from 'https://deno.land/x/oak@v12.4.0/mod.ts'

import { generateError } from '../../tools/index.ts'
import Languages from './Languages.ts'
import { Language } from '../../types/index.ts'

export async function getLanguages(ctx: Context) {
	try {
		const languages: Language[] = await Languages.getLanguages()
		if (languages.length === 0) {
			ctx.response.status = Status.NoContent
		} else {
			ctx.response.status = Status.OK
			ctx.response.body = { data: languages }
		}
	} catch (err) {
		ctx.response.status = Status.InternalServerError
		ctx.response.body = { error: generateError(err.message) }
	}
}

export async function getLanguage(ctx: Context) {
	try {
		const languageId = ctx.state.languageId as number
		const language: Language | null = await Languages.getLanguage(languageId)
		if (language === null) {
			ctx.response.status = Status.NoContent
		} else {
			ctx.response.status = Status.OK
			ctx.response.body = { data: language }
		}
	} catch (err) {
		ctx.response.status = Status.InternalServerError
		ctx.response.body = { error: generateError(err.message) }
	}
}

export async function addLanguage(ctx: Context) {
	try {
		const { name } = ctx.state.data as Language
		const result = await Languages.addLanguage({ name })
		if (result.affectedRows === 1) {
			const language: Language = { languageId: result.lastInsertId as number, name }
			ctx.response.status = Status.Created
			ctx.response.body = { data: language }
		} else {
			ctx.response.status = Status.BadRequest
			ctx.response.body = {
				error: {
					code: 106,
					type: 'post_failed',
					info: 'Something went wrong : Impossible to add the language',
				},
			}
		}
	} catch (err) {
		ctx.response.status = Status.InternalServerError
		ctx.response.body = { error: generateError(err.message) }
	}
}
