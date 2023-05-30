import db from '../../helpers/db.ts'
import { User } from '../../types/index.ts'

class Users {
	static async getUsers({ offset, count }: { offset: number; count: number }) {
		const users: User[] = await db.query(
			`SELECT userId, username 
			 FROM users LIMIT ?, ?`,
			[offset, count],
		)
		return users
	}

	static async getUser(userId: number) {
		const user: User[] = await db.query(
			`SELECT userId, username 
			 FROM users WHERE userId = ?`,
			[userId],
		)
		return user.length === 0 ? null : user[0]
	}

	static async addUser({ username, password }: { username: string; password: string }) {
		const result = await db.execute(
			`INSERT INTO users(username, password) 
			 VALUES(?, ?)`,
			[username, password],
		)
		return result
	}

	static async updateUser(userId: number, { username, password }: { username: string; password: string }) {
		const result = await db.execute(
			`UPDATE users 
			 SET username = ?, password = ?
			 WHERE userId = ?`,
			[username, password, userId],
		)
		return result
	}

	static async deleteUser(userId: number) {
		const result = await db.execute(
			`DELETE FROM users 
			 WHERE userId = ?`,
			[userId],
		)
		return result
	}
}

export default Users
