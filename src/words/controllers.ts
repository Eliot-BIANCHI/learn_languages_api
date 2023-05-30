import { Context, Status } from 'https://deno.land/x/oak@v12.4.0/mod.ts'

import { generateError } from '../../tools/index.ts'
import Words from './Words.ts'
import { Word } from '../../types/index.ts'
import { getWords } from '../../types/queries.schemas.ts'

export async function getWords(ctx: Context) {
	try {
		const { name, languageId } = ctx.state.queries as getWords
		const words: Word[] = await Words.getWords({ name, languageId })
		if (words.length === 0) {
			ctx.response.status = Status.NoContent
		} else {
			ctx.response.status = Status.OK
			ctx.response.body = { data: words }
		}
	} catch (err) {
		ctx.response.status = Status.InternalServerError
		ctx.response.body = { error: generateError(err.message) }
	}
}

export async function getWord(ctx: Context) {
	try {
		const wordId = ctx.state.wordId as number
		const word: Word | null = await Words.getWord(wordId)
		if (word === null) {
			ctx.response.status = Status.NoContent
		} else {
			ctx.response.status = Status.OK
			ctx.response.body = { data: word }
		}
	} catch (err) {
		ctx.response.status = Status.InternalServerError
		ctx.response.body = { error: generateError(err.message) }
	}
}

export async function addWord(ctx: Context) {
	try {
		const { name, languageId, grammaticalCategoryId } = ctx.state.data as Word
		const result = await Words.addWord({ name, languageId, grammaticalCategoryId })
		if (result.affectedRows === 1) {
			const word: Word = { wordId: result.lastInsertId as number, name, languageId, grammaticalCategoryId }
			ctx.response.status = Status.Created
			ctx.response.body = { data: word }
		} else {
			ctx.response.status = Status.BadRequest
			ctx.response.body = {
				error: {
					code: 106,
					type: 'post_failed',
					info: 'Something went wrong : Impossible to add the word',
				},
			}
		}
	} catch (err) {
		ctx.response.status = Status.InternalServerError
		ctx.response.body = { error: generateError(err.message) }
	}
}

export async function updateWord(ctx: Context) {
	try {
		const wordId = ctx.state.wordId as number
		const { name, languageId } = ctx.state.data as Word
		const result = await Words.updateWord(wordId, { name, languageId })
		if (result.affectedRows === 1) {
			ctx.response.status = Status.NoContent
		} else {
			ctx.response.status = Status.BadRequest
			ctx.response.body = {
				error: {
					code: 107,
					type: 'update_failed',
					info: 'The word doesn\'t exist or none of it\'s fields have been modified',
				},
			}
		}
	} catch (err) {
		ctx.response.status = Status.InternalServerError
		ctx.response.body = { error: generateError(err.message) }
	}
}

export async function deleteWord(ctx: Context) {
	try {
		const wordId = ctx.state.wordId as number
		const result = await Words.deleteWord(wordId)
		if (result.affectedRows === 1) {
			ctx.response.status = Status.NoContent
		} else {
			ctx.response.status = Status.BadRequest
			ctx.response.body = {
				error: {
					code: 109,
					type: 'delete_failed',
					info: 'The word doesn\'t exist',
				},
			}
		}
	} catch (err) {
		ctx.response.status = Status.InternalServerError
		ctx.response.body = { error: generateError(err.message) }
	}
}
