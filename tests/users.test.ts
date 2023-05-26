import { assertEquals } from 'https://deno.land/std@0.188.0/testing/asserts.ts'
import 'https://deno.land/std@0.187.0/dotenv/load.ts'

import { generateRandomString } from '../tools/index.ts'
import { User } from '../types/index.ts'

const usersUrl = Deno.env.get('DEV_URL') + '/users'
let userToDeleteId = -1

Deno.test('Get a certain number of users based of the "count" query', async () => {
	const count = 3
	const response = await fetch(`${usersUrl}?offset=0&count=${count}`)
	const result = await response.json()
	const user: User = result.data[0]
	assertEquals(result.data.length, count)
	assertEquals(user.username, 'Eliot Bianchi')
})

Deno.test('Get a single user based of an ID', async () => {
	const response = await fetch(`${usersUrl}/1`)
	const result = await response.json()
	const user: User = result.data
	assertEquals(user.username, 'Eliot Bianchi')
})

Deno.test('Add a single user', async () => {
	const password = generateRandomString(16)
	const body = {
		username: 'Albracca Deschênes',
		password: password,
	}
	const response = await fetch(usersUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
	})
	const result = await response.json()
	const user: User = result.data
	assertEquals(user.username, body.username)
	userToDeleteId = user.userId
})

Deno.test('Update a single user based of an ID', async () => {
	const password = generateRandomString(16)
	const body = {
		username: 'Martin Bienvenue',
		password: password,
	}
	const response = await fetch(`${usersUrl}/2`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
	})
	assertEquals(response.body, null)
})

Deno.test('Delete a single user based of an ID', async () => {
	const response = await fetch(`${usersUrl}/${userToDeleteId}`, {
		method: 'DELETE',
	})
	assertEquals(response.body, null)
})
