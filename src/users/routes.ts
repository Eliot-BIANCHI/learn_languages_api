import { Router } from 'https://deno.land/x/oak@v12.4.0/mod.ts'

import { addUser, deleteUser, getUser, getUsers, updateUser } from './controllers.ts'
import { validateIdParams, validateInputs, validateQueries } from '../../middlewares/index.ts'
import { UserSchema } from '../../types/index.ts'
import { getUsersSchema } from '../../types/queries.schemas.ts'

const router = new Router()

router.get('/users', validateQueries(getUsersSchema), getUsers)

router.get('/users/:userId', validateIdParams(['userId']), getUser)

router.post('/users', validateInputs(UserSchema), addUser)

router.put('/users/:userId', validateIdParams(['userId']), validateInputs(UserSchema), updateUser)

router.delete('/users/:userId', validateIdParams(['userId']), deleteUser)

export default router
