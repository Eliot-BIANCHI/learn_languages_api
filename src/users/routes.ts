import { Router } from 'https://deno.land/x/oak@v12.4.0/mod.ts'

import { addUser, deleteUser, getUser, getUsers, updateUser } from './controllers.ts'
import { checkQueries, validateIdParam, validateInputs } from '../../middlewares/index.ts'
import { userSchema } from '../../types/index.ts'
import { NumberQuery } from '../../types/queries.types.ts'

const router = new Router()

router.get(
	'/users',
	checkQueries([
		{ name: 'offset', schema: { min: 0, default: 0 } as NumberQuery },
		{ name: 'count', schema: { min: 0, max: 30, default: 5 } as NumberQuery },
	]),
	getUsers,
)

router.get('/users/:userId', validateIdParam('userId'), getUser)

router.post('/users', validateInputs(userSchema), addUser)

router.put('/users/:userId', validateIdParam('userId'), validateInputs(userSchema), updateUser)

router.delete('/users/:userId', validateIdParam('userId'), deleteUser)

export default router
