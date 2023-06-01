import db from '../../helpers/db.ts'
import { FindCorrectTranslation, TranslateItRight } from '../../types/index.ts'

class Games {
	static async findCorrectTranslation(
		{ languageTranslatedId, languageTranslatorId, numberTranslations }: {
			languageTranslatedId: number
			languageTranslatorId: number
			numberTranslations: number
		},
	) {
		const translations: FindCorrectTranslation[] = await db.query(
			`SELECT wordTranslated.name AS displayed, wordTranslator.name AS correctAnswer, 
					wrongTranslation.name AS wrongAnswer1, wrongTranslation2.name AS wrongAnswer2
             FROM translations AS transl

             INNER JOIN words AS wordTranslated
                ON wordTranslated.wordId = transl.wordTranslatedId
				AND wordTranslated.languageId = ?

			 INNER JOIN words AS wordTranslator
			 	ON wordTranslator.wordId = transl.wordTranslatorId
				AND wordTranslator.languageId = ?

			 INNER JOIN translations AS transl2
			 	ON transl2.wordTranslatedId != wordTranslated.wordId

				INNER JOIN words AS wrongTranslation
					ON wrongTranslation.wordId = transl2.wordTranslatorId
					AND wrongTranslation.languageId = ?

			 INNER JOIN translations AS transl3
				ON transl3.wordTranslatedId != wordTranslated.wordId
				AND transl3.wordTranslatedId != transl2.wordTranslatedId

				INNER JOIN words AS wrongTranslation2
					ON wrongTranslation2.wordId = transl3.wordTranslatorId
					AND wrongTranslation2.languageId = ?

             ORDER BY RAND()
             LIMIT ?`,
			[
				languageTranslatedId,
				languageTranslatorId,
				languageTranslatorId,
				languageTranslatorId,
				numberTranslations,
			],
		)
		return translations
	}

	static async translateItRight(
		{ languageTranslatedId, languageTranslatorId, numberTranslations }: {
			languageTranslatedId: number
			languageTranslatorId: number
			numberTranslations: number
		},
	) {
		const translations: TranslateItRight[] = await db.query(
			`SELECT wordTranslated.name AS correctAnswer, wordTranslator.name AS displayed,
					translations.illustration
             FROM translations
             INNER JOIN words AS wordTranslated
                ON wordTranslatedId = wordTranslated.wordId 
				AND wordTranslated.languageId = ?
             INNER JOIN words AS wordTranslator
                ON wordTranslatorId = wordTranslator.wordId 
				AND wordTranslator.languageId = ?
			 WHERE translations.illustration IS NOT NULL
             ORDER BY RAND()
             LIMIT ?`,
			[
				languageTranslatedId,
				languageTranslatorId,
				numberTranslations,
			],
		)
		return translations
	}
}

export default Games
