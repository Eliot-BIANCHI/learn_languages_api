import { Context, helpers, Next, Status } from 'https://deno.land/x/oak@v12.4.0/mod.ts'
import { ZodType } from 'https://deno.land/x/zod@v3.21.4/types.ts'

import { NumberQuery, Query, StringQuery } from '../types/queries.types.ts'

export function validateIdParam(idName: string) {
	return async function (ctx: Context, next: Next) {
		const { [idName]: idParam } = helpers.getQuery(ctx, { mergeParams: true })
		const id = parseInt(idParam)

		if (Number.isInteger(id) === false) {
			ctx.response.status = Status.BadRequest
			ctx.response.body = {
				error: {
					code: 601,
					type: 'invalid_id',
					info: `${idName} should be an integer.`,
				},
			}
			return
		}

		ctx.state[idName] = id

		await next()
	}
}

export function checkQueries(queries: Query[]) {
	return async function (ctx: Context, next: Next) {
		const reqQueries = helpers.getQuery(ctx, { mergeParams: false })

		ctx.state.queries = {}

		queries.forEach((query) => {
			const reqQuery = reqQueries[query.name]

			const querySchema = query.schema
			const value = typeof querySchema.default === 'string'
				? validateStringQuery(querySchema as StringQuery, reqQuery)
				: validateNumberQuery(querySchema as NumberQuery, reqQuery)

			ctx.state.queries[query.name] = value
		})

		await next()
	}
}

export function validateInputs<T>(schema: ZodType<T>) {
	return async function (ctx: Context, next: Next) {
		const body = ctx.request.body()
		const value = await body.value
		const result = schema.safeParse(value)

		if (result.success === false) {
			const issues = result.error.issues
			const errors = []
			for (const issue of issues) {
				errors.push(issue.message)
			}
			ctx.response.status = Status.BadRequest
			ctx.response.body = {
				error: {
					code: 603,
					type: 'invalid_input',
					info: errors,
				},
			}
			return
		}

		ctx.state.data = result.data

		await next()
	}
}

function validateStringQuery(schema: StringQuery, reqQuery: string) {
	if (schema.values?.includes(reqQuery) === false) {
		return schema.default
	}
	return reqQuery
}

function validateNumberQuery(schema: NumberQuery, reqQuery: string) {
	const queryValue = parseInt(reqQuery)
	if (Number.isInteger(queryValue) === false) {
		return schema.default
	} else if (schema.min && schema.min > queryValue) {
		return schema.default
	} else if (schema.max && schema.max < queryValue) {
		return schema.default
	}
	return queryValue
}