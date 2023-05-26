import { Client } from 'https://deno.land/x/mysql@v2.11.0/mod.ts'
import 'https://deno.land/std@0.187.0/dotenv/load.ts'

const client = await new Client().connect({
	hostname: Deno.env.get('DB_HOSTNAME'),
	port: parseInt(Deno.env.get('DB_PORT') as string),
	username: Deno.env.get('DB_USERNAME'),
	db: Deno.env.get('DB_NAME'),
	password: Deno.env.get('DB_PASSWORD'),
})

export default client
