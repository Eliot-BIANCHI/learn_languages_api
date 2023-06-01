import { Router } from 'https://deno.land/x/oak@v12.4.0/mod.ts'

import { findCorrectTranslation, translateItRight } from './controllers.ts'
import { validateInputs } from '../../middlewares/index.ts'

import { GameSchema } from '../../types/index.ts'

const router = new Router()

router.post('/games/find-correct-translation', validateInputs(GameSchema), findCorrectTranslation)

router.post('/games/translate-it-right', validateInputs(GameSchema), translateItRight)

export default router
