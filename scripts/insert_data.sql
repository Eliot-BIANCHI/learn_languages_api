-- source Projects/learn_languages_api/scripts/insert_data.sql

INSERT INTO `users`(`username`, `password`)
    VALUES('Eliot Bianchi', 'azerty'),
          ('Kelly R. Sheppard', 'Uusab4Ooqu'),
          ('Pinabel Langelier', 'ooPhee9ph'),
          ('Beaufort Querry', 'maeng5Tho'),
          ('Luis Carvalho Pinto', 'Ohka0aoju');

INSERT INTO `languages`(`name`)
    VALUES('Français'),
          ('English'),
          ('Italiano');
    
INSERT INTO `grammaticalCategories`(`name`)
    VALUES('Noun'),
          ('Pronoun'),
          ('Verb'),
          ('Adjective'),
          ('Adverb'),
          ('Preposition'),
          ('Conjunction'),
          ('Interjection'),
          ('Expression');

INSERT INTO `words`(`name`, `languageId`, `grammaticalCategoryId`)
    VALUES('bonjour', 1, 1),
          ('buongiorno', 3, 1),
          ('arme', 1, 1),
          ('weapon', 2, 1),
          ('cauchemar', 1, 1),
          ('nightmare', 2, 1),
          ('deceitful', 2, 4),
          ('malhonnête', 1, 4),
          ('trompeur', 1, 4),
          ('bad dream', 2, 1),
          ('adieu', 1, 1),
          ('goodbye', 2, 1),
          ('test$', 1, 9),
          ('test*', 2, 9);

INSERT INTO `translations`(`wordTranslatedId`, `wordTranslatorId`, `illustration`)
    VALUES(1, 2, 'Non capisco quei colleghi che non danno mai il buongiorno.'),
          (3, 4, 'It is unfair to use a weapon against an unarmed opponent.'),
          (5, 6, 'The financial situation of the company was a nightmare.'),
          (5, 10, 'I had a bad dream last night about failing all my exams.'),
          (7, 8, 'Ne pas payer le juste prix était malhonnête de sa part.'),
          (7, 9, 'Les apparences sont parfois trompeuses.'),
          (11, 12, 'Goodbye! See you all next year!');