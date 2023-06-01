import db from '../../helpers/db.ts'
import { Translation } from '../../types/index.ts'

class Translations {
	static async getTranslations(wordTranslatedId: number) {
		const translations: Translation[] = await db.query(
			`SELECT wordTranslatorId, words.name, illustration 
			 FROM translations
			 INNER JOIN words 
			 	ON wordTranslatorId = words.wordId
			 WHERE wordTranslatedId = ?`,
			[wordTranslatedId],
		)
		return translations
	}

	static async getTranslation(
		{ wordTranslatedId, wordTranslatorId }: { wordTranslatedId: number; wordTranslatorId: number },
	) {
		const translation: Translation[] = await db.query(
			`SELECT wordTranslatedId, wordTranslatorId, words.name, illustration 
			 FROM translations
			 INNER JOIN words 
			 	ON wordTranslatorId = words.wordId
			 WHERE wordTranslatedId = ? AND wordTranslatorId = ?`,
			[wordTranslatedId, wordTranslatorId],
		)
		return translation.length === 0 ? null : translation[0]
	}

	static async addTranslation(
		{ wordTranslatedId, wordTranslatorId, illustration }: {
			wordTranslatedId: number
			wordTranslatorId: number
			illustration: string | undefined
		},
	) {
		const result = await db.execute(
			`INSERT INTO translations(wordTranslatedId, wordTranslatorId, illustration) 
			 VALUES(?, ?, ?)`,
			[wordTranslatedId, wordTranslatorId, illustration],
		)
		return result
	}

	static async deleteTranslation(
		{ wordTranslatedId, wordTranslatorId }: { wordTranslatedId: number; wordTranslatorId: number },
	) {
		const result = await db.execute(
			`DELETE FROM translations 
			 WHERE wordTranslatedId = ? AND wordTranslatorId = ?`,
			[wordTranslatedId, wordTranslatorId],
		)
		return result
	}
}

export default Translations
