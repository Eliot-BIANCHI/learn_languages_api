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
          ('bad dream', 2, 1);

INSERT INTO `translations`(`wordTranslatedId`, `wordTranslatorId`)
    VALUES(1, 2),
          (3, 4),
          (5, 6),
          (7, 8),
          (7, 9);