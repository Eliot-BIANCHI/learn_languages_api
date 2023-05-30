import { assertEquals } from 'https://deno.land/std@0.188.0/testing/asserts.ts'
import 'https://deno.land/std@0.187.0/dotenv/load.ts'

import { Translation } from '../types/index.ts'

const translationsUrl = Deno.env.get('DEV_URL') + '/translations'

Deno.test('Get a certain number of translations based of the ID of the word that needs to be translated', async () => {
	const wordTranslatedId = 1
	const response = await fetch(`${translationsUrl}/${wordTranslatedId}`)
	const result = await response.json()
	const translation: Translation = result.data[0]
	assertEquals(translation.name, 'buongiorno')
})

Deno.test('Add a single translation', async () => {
	const body = {
		wordTranslatedId: 5,
		wordTranslatorId: 10,
	}
	const response = await fetch(translationsUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
	})
	const result = await response.json()
	const translation: Translation = result.data
	assertEquals(translation.name, 'bad dream')
})

Deno.test('Delete a single translation based of the ID of the word translated and the word translator', async () => {
	const response = await fetch(`${translationsUrl}/5/10`, {
		method: 'DELETE',
	})
	assertEquals(response.body, null)
})
