import { Router } from 'https://deno.land/x/oak@v12.4.0/mod.ts'

import { getGrammaticalCategories, getGrammaticalCategory } from './controllers.ts'
import { validateIdParams } from '../../middlewares/index.ts'

const router = new Router()

router.get('/grammatical-categories', getGrammaticalCategories)

router.get(
	'/grammatical-categories/:grammaticalCategoryId',
	validateIdParams(['grammaticalCategoryId']),
	getGrammaticalCategory,
)

export default router
