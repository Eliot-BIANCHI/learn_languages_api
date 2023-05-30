import db from '../../helpers/db.ts'
import { GrammaticalCategory } from '../../types/index.ts'

class GrammaticalCategories {
	static async getGrammaticalCategories() {
		const grammaticalCategories: GrammaticalCategory[] = await db.query(
			`SELECT grammaticalCategoryId, name 
			 FROM grammaticalCategories`,
		)
		return grammaticalCategories
	}

	static async getGrammaticalCategory(grammaticalCategoryId: number) {
		const grammaticalCategory: GrammaticalCategory[] = await db.query(
			`SELECT grammaticalCategoryId, name 
			 FROM grammaticalCategories
             WHERE grammaticalCategoryId = ?`,
			[grammaticalCategoryId],
		)
		return grammaticalCategory.length === 0 ? null : grammaticalCategory[0]
	}
}

export default GrammaticalCategories
