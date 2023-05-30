import { Application } from 'https://deno.land/x/oak@v12.4.0/mod.ts'
import 'https://deno.land/std@0.187.0/dotenv/load.ts'

import usersRoutes from './src/users/routes.ts'
import languagesRoutes from './src/languages/routes.ts'
import wordsRoutes from './src/words/routes.ts'
import translationsRoutes from './src/translations/routes.ts'

const app = new Application()

app.use(usersRoutes.routes())
app.use(usersRoutes.allowedMethods())

app.use(languagesRoutes.routes())
app.use(languagesRoutes.allowedMethods())

app.use(wordsRoutes.routes())
app.use(wordsRoutes.allowedMethods())

app.use(translationsRoutes.routes())
app.use(translationsRoutes.allowedMethods())

const PORT = parseInt(Deno.env.get('SERVER_PORT') as string) || 3001
await app.listen({ port: PORT })
