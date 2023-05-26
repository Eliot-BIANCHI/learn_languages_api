import { Router } from 'https://deno.land/x/oak@v12.4.0/mod.ts'

import { addLanguage, deleteUser, getLanguage, getLanguages } from './controllers.ts'
import { validateIdParam, validateInputs } from '../../middlewares/index.ts'
import { languageSchema } from '../../types/index.ts'

const router = new Router()

router.get('/languages', getLanguages)

router.get('/languages/:languageId', validateIdParam('languageId'), getLanguage)

router.post('/languages', validateInputs(languageSchema), addLanguage)

router.delete('/languages/:languageId', validateIdParam('languageId'), deleteUser)

export default router
