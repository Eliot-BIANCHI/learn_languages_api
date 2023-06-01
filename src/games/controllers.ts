import { Context, Status } from 'https://deno.land/x/oak@v12.4.0/mod.ts'

import { generateError } from '../../tools/index.ts'
import Games from './Games.ts'
import { FindCorrectTranslation, Game, TranslateItRight } from '../../types/index.ts'

export async function findCorrectTranslation(ctx: Context) {
	try {
		const {
			languageTranslatedId,
			languageTranslatorId,
			numberTranslations,
		} = ctx.state.data as Game
		const translations: FindCorrectTranslation[] = await Games.findCorrectTranslation({
			languageTranslatedId,
			languageTranslatorId,
			numberTranslations,
		})
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

export async function translateItRight(ctx: Context) {
	try {
		const {
			languageTranslatedId,
			languageTranslatorId,
			numberTranslations,
		} = ctx.state.data as Game
		const translations: TranslateItRight[] = await Games.translateItRight({
			languageTranslatedId,
			languageTranslatorId,
			numberTranslations,
		})
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
