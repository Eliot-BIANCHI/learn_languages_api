import { Context, helpers, Next, Status } from 'https://deno.land/x/oak@v12.4.0/mod.ts'
import { ZodType } from 'https://deno.land/x/zod@v3.21.4/types.ts'

export function validateIdParams(idsName: string[]) {
	return async function (ctx: Context, next: Next) {
		idsName.forEach((idName) => {
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
		})

		await next()
	}
}

export function validateQueries<T>(schema: ZodType<T>) {
	return async function (ctx: Context, next: Next) {
		const queries = helpers.getQuery(ctx, { mergeParams: false })
		const result = schema.safeParse(queries)

		if (result.success === false) {
			const issues = result.error.issues
			const errors = []
			for (const issue of issues) {
				errors.push(issue.message)
			}
			ctx.response.status = Status.BadRequest
			ctx.response.body = {
				error: {
					code: 602,
					type: 'invalid_queries',
					info: errors,
				},
			}
			return
		}

		ctx.state.queries = result.data

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
