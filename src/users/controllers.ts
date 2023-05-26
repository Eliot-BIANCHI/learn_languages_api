import { Context, Status } from 'https://deno.land/x/oak@v12.4.0/mod.ts'

import { generateError } from '../../tools/index.ts'
import Users from './Users.ts'
import { User } from '../../types/index.ts'

export async function getUsers(ctx: Context) {
	try {
		const { offset, count } = ctx.state.queries as { offset: number; count: number }
		const users: User[] = await Users.getUsers({ offset, count })
		if (users.length === 0) {
			ctx.response.status = Status.NoContent
		} else {
			ctx.response.status = Status.OK
			ctx.response.body = { data: users }
		}
	} catch (err) {
		ctx.response.status = Status.InternalServerError
		ctx.response.body = { error: generateError(err.message) }
	}
}

export async function getUser(ctx: Context) {
	try {
		const userId = ctx.state.userId as number
		const user: User | null = await Users.getUser(userId)
		if (user === null) {
			ctx.response.status = Status.NoContent
		} else {
			ctx.response.status = Status.OK
			ctx.response.body = { data: user }
		}
	} catch (err) {
		ctx.response.status = Status.InternalServerError
		ctx.response.body = { error: generateError(err.message) }
	}
}

export async function addUser(ctx: Context) {
	try {
		const { username, password } = ctx.state.data as User
		const result = await Users.addUser({ username, password })
		if (result.affectedRows === 1) {
			const user: User = { userId: result.lastInsertId as number, username, password: '**********' }
			ctx.response.status = Status.Created
			ctx.response.body = { data: user }
		} else {
			ctx.response.status = Status.BadRequest
			ctx.response.body = {
				error: {
					code: 106,
					type: 'post_failed',
					info: 'Something went wrong : Impossible to add the user',
				},
			}
		}
	} catch (err) {
		ctx.response.status = Status.InternalServerError
		ctx.response.body = { error: generateError(err.message) }
	}
}

export async function updateUser(ctx: Context) {
	try {
		const userId = ctx.state.userId as number
		const { username, password } = ctx.state.data as User
		const result = await Users.updateUser(userId, { username, password })
		if (result.affectedRows === 1) {
			ctx.response.status = Status.NoContent
		} else {
			ctx.response.status = Status.BadRequest
			ctx.response.body = {
				error: {
					code: 107,
					type: 'update_failed',
					info: 'The user doesn\'t exist or none of it\'s fields have been modified',
				},
			}
		}
	} catch (err) {
		ctx.response.status = Status.InternalServerError
		ctx.response.body = { error: generateError(err.message) }
	}
}

export async function deleteUser(ctx: Context) {
	try {
		const userId = ctx.state.userId as number
		const result = await Users.deleteUser(userId)
		if (result.affectedRows === 1) {
			ctx.response.status = Status.NoContent
		} else {
			ctx.response.status = Status.BadRequest
			ctx.response.body = {
				error: {
					code: 109,
					type: 'delete_failed',
					info: 'Something went wrong : Impossible to delete the user',
				},
			}
		}
	} catch (err) {
		ctx.response.status = Status.InternalServerError
		ctx.response.body = { error: generateError(err.message) }
	}
}
