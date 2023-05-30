import { Router } from 'https://deno.land/x/oak@v12.4.0/mod.ts'

import { addTranslation, deleteTranslation, getTranslations } from './controllers.ts'
import { validateIdParams, validateInputs } from '../../middlewares/index.ts'
import { TranslationSchema } from '../../types/index.ts'

const router = new Router()

router.get('/translations/:wordTranslatedId', validateIdParams(['wordTranslatedId']), getTranslations)

router.post('/translations', validateInputs(TranslationSchema), addTranslation)

router.delete(
	'/translations/:wordTranslatedId/:wordTranslatorId',
	validateIdParams(['wordTranslatedId', 'wordTranslatorId']),
	deleteTranslation,
)

export default router
