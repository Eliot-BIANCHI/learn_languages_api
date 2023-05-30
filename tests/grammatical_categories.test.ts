import { assertEquals } from 'https://deno.land/std@0.188.0/testing/asserts.ts'
import 'https://deno.land/std@0.187.0/dotenv/load.ts'

import { GrammaticalCategory } from '../types/index.ts'

const grammaticalCategoriesUrl = Deno.env.get('DEV_URL') + '/grammatical-categories'

Deno.test('Get all grammatical categories', async () => {
	const response = await fetch(`${grammaticalCategoriesUrl}`)
	const result = await response.json()
	const grammaticalCategory: GrammaticalCategory = result.data.find((grammaticalCategory: GrammaticalCategory) =>
		grammaticalCategory.grammaticalCategoryId === 1
	)
	assertEquals(grammaticalCategory.name, 'Noun')
})

Deno.test('Get a single grammatical category based of an ID', async () => {
	const response = await fetch(`${grammaticalCategoriesUrl}/1`)
	const result = await response.json()
	const grammaticalCategory: GrammaticalCategory = result.data
	assertEquals(grammaticalCategory.name, 'Noun')
})
