import { Router } from 'https://deno.land/x/oak@v12.4.0/mod.ts'

import { addWord, deleteWord, getWord, getWords, updateWord } from './controllers.ts'
import { validateIdParams, validateInputs, validateQueries } from '../../middlewares/index.ts'
import { WordSchema } from '../../types/index.ts'
import { getWordsSchema } from '../../types/queries.schemas.ts'

const router = new Router()

router.get('/words', validateQueries(getWordsSchema), getWords)

router.get('/words/:wordId', validateIdParams(['wordId']), getWord)

router.post('/words', validateInputs(WordSchema), addWord)

router.put('/words/:wordId', validateIdParams(['wordId']), validateInputs(WordSchema), updateWord)

router.delete('/words/:wordId', validateIdParams(['wordId']), deleteWord)

export default router
