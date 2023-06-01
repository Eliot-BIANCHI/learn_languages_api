import { Context, Status } from 'https://deno.land/x/oak@v12.4.0/mod.ts'

import { generateError } from '../../tools/index.ts'
import Translations from './Translations.ts'
import { Translation } from '../../types/index.ts'

export async function getTranslations(ctx: Context) {
	try {
		const wordTranslatedId = ctx.state.wordTranslatedId as number
		const translations: Translation[] = await Translations.getTranslations(wordTranslatedId)
		if (translations.length === 0) {
			ctx.response.status = Status.NoContent
		} else {
			ctx.response.status = Status.OK
			ctx.response.body = { data: translations }
		}
	} catch (err) {
		ctx.response.status = Status.InternalServerError
		ctx.response.body = { error: generateError(err.message) }
	}
}

export async function addTranslation(ctx: Context) {
	try {
		const { wordTranslatedId, wordTranslatorId, illustration } = ctx.state.data as Translation
		const result = await Translations.addTranslation({ wordTranslatedId, wordTranslatorId, illustration })
		if (result.affectedRows === 1) {
			const translation = await Translations.getTranslation({ wordTranslatedId, wordTranslatorId }) as Translation
			ctx.response.status = Status.Created
			ctx.response.body = { data: translation }
		} else {
			ctx.response.status = Status.BadRequest
			ctx.response.body = {
				error: {
					code: 106,
					type: 'post_failed',
					info: 'Something went wrong : Impossible to add the translation',
				},
			}
		}
	} catch (err) {
		ctx.response.status = Status.InternalServerError
		ctx.response.body = { error: generateError(err.message) }
	}
}

export async function deleteTranslation(ctx: Context) {
	try {
		const wordTranslatedId = ctx.state.wordTranslatedId as number
		const wordTranslatorId = ctx.state.wordTranslatorId as number
		const result = await Translations.deleteTranslation({ wordTranslatedId, wordTranslatorId })
		if (result.affectedRows === 1) {
			ctx.response.status = Status.NoContent
		} else {
			ctx.response.status = Status.BadRequest
			ctx.response.body = {
				error: {
					code: 109,
					type: 'delete_failed',
					info: 'The translation doesn\'t exist',
				},
			}
		}
	} catch (err) {
		ctx.response.status = Status.InternalServerError
		ctx.response.body = { error: generateError(err.message) }
	}
}
