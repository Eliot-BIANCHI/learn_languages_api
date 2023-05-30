import db from '../../helpers/db.ts'
import { Language } from '../../types/index.ts'

class Languages {
	static async getLanguages() {
		const languages: Language[] = await db.query(
			`SELECT languageId, name 
			 FROM languages`,
		)
		return languages
	}

	static async getLanguage(languageId: number) {
		const language: Language[] = await db.query(
			`SELECT languageId, name 
			 FROM languages 
			 WHERE languageId = ?`,
			[languageId],
		)
		return language.length === 0 ? null : language[0]
	}

	static async addLanguage({ name }: { name: string }) {
		const result = await db.execute(
			`INSERT INTO languages(name) 
			 VALUES(?)`,
			[name],
		)
		return result
	}
}

export default Languages
