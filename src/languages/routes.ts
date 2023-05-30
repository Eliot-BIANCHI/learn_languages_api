import { Router } from 'https://deno.land/x/oak@v12.4.0/mod.ts'

import { addLanguage, getLanguage, getLanguages } from './controllers.ts'
import { validateIdParams, validateInputs } from '../../middlewares/index.ts'
import { LanguageSchema } from '../../types/index.ts'

const router = new Router()

router.get('/languages', getLanguages)

router.get('/languages/:languageId', validateIdParams(['languageId']), getLanguage)

router.post('/languages', validateInputs(LanguageSchema), addLanguage)

export default router
