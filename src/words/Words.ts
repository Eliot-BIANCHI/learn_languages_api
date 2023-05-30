import db from '../../helpers/db.ts'
import { Word } from '../../types/index.ts'

class Words {
	static async getWords({ name, languageId }: { name: string; languageId: number }) {
		const words: Word[] = await db.query(
			`SELECT wordId, name 
			 FROM words 
			 WHERE languageId = ? AND name LIKE ?`,
			[languageId, name + '%'],
		)
		return words
	}

	static async getWord(wordId: number) {
		const word: Word[] = await db.query(
			`SELECT wordId, name 
			 FROM words 
			 WHERE wordId = ?`,
			[wordId],
		)
		return word.length === 0 ? null : word[0]
	}

	static async addWord(
		{ name, languageId, grammaticalCategoryId }: { name: string; languageId: number; grammaticalCategoryId: number },
	) {
		const result = await db.execute(
			`INSERT INTO words(name, languageId, grammaticalCategoryId) 
			 VALUES(?, ?, ?)`,
			[name, languageId, grammaticalCategoryId],
		)
		return result
	}

	static async updateWord(wordId: number, { name, languageId }: { name: string; languageId: number }) {
		const result = await db.execute(
			`UPDATE words 
			 SET name = ?, languageId = ? 
			 WHERE wordId = ?`,
			[name, languageId, wordId],
		)
		return result
	}

	static async deleteWord(wordId: number) {
		const result = await db.execute(
			`DELETE FROM words 
			 WHERE wordId = ?`,
			[wordId],
		)
		return result
	}
}

export default Words
