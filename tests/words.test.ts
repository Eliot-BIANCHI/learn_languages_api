import { assertEquals } from 'https://deno.land/std@0.188.0/testing/asserts.ts'
import 'https://deno.land/std@0.187.0/dotenv/load.ts'

import { Word } from '../types/index.ts'

const wordsUrl = Deno.env.get('DEV_URL') + '/words'
let wordToDeleteId = -1

Deno.test('Get a certain number of words based of the "name" query', async () => {
	const name = 'wea'
	const languageId = 2
	const response = await fetch(`${wordsUrl}?name=${name}&languageId=${languageId}`)
	const result = await response.json()
	const word: Word = result.data[0]
	assertEquals(word.name.startsWith(name), true)
})

Deno.test('Get a single word based of an ID', async () => {
	const response = await fetch(`${wordsUrl}/1`)
	const result = await response.json()
	const word: Word = result.data
	assertEquals(word.name, 'bonjour')
})

Deno.test('Add a single word', async () => {
	const body = {
		name: 'au revoir',
		languageId: 1,
	}
	const response = await fetch(wordsUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
	})
	const result = await response.json()
	const word: Word = result.data
	assertEquals(word.name, 'au revoir')
	wordToDeleteId = word.wordId
})

Deno.test('Update a single word based of an ID', async () => {
	const body = {
		name: 'à bientôt',
		languageId: 1,
	}
	const response = await fetch(`${wordsUrl}/${wordToDeleteId}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
	})
	assertEquals(response.body, null)
})

Deno.test('Delete a single word based of an ID', async () => {
	const response = await fetch(`${wordsUrl}/${wordToDeleteId}`, {
		method: 'DELETE',
	})
	assertEquals(response.body, null)
})
