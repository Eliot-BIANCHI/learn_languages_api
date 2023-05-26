import { Application } from 'https://deno.land/x/oak@v12.4.0/mod.ts'
import 'https://deno.land/std@0.187.0/dotenv/load.ts'

import usersRoutes from './src/users/routes.ts'

const app = new Application()

app.use(usersRoutes.routes())
app.use(usersRoutes.allowedMethods())


const PORT = parseInt(Deno.env.get('SERVER_PORT') as string) || 3001
await app.listen({ port: PORT })