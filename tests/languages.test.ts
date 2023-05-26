import { assertEquals } from 'https://deno.land/std@0.188.0/testing/asserts.ts'
import 'https://deno.land/std@0.187.0/dotenv/load.ts'

import { Language } from '../types/index.ts'

const languagesUrl = Deno.env.get('DEV_URL') + '/languages'
let languageToDeleteId = -1

Deno.test('Get all languages', async () => {
	const response = await fetch(languagesUrl)
	const result = await response.json()
	const language: Language = result.data[0]
	assertEquals(language.name, 'Français')
})

Deno.test('Get a single language based of an ID', async () => {
	const response = await fetch(`${languagesUrl}/1`)
	const result = await response.json()
	const language: Language = result.data
	assertEquals(language.name, 'Français')
})

Deno.test('Add a single language', async () => {
	const body = {
		name: 'Español'
	}
	const response = await fetch(languagesUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
	})
	const result = await response.json()
	const language: Language = result.data
	assertEquals(language.name, body.name)
	languageToDeleteId = language.languageId
})

Deno.test('Delete a single language based of an ID', async () => {
	const response = await fetch(`${languagesUrl}/${languageToDeleteId}`, {
		method: 'DELETE',
	})
	assertEquals(response.body, null)
})
