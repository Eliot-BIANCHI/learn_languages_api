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
    
INSERT INTO `words`(`name`, `languageId`)
    VALUES('bonjour', 1),
          ('buongiorno', 3),
          ('arme', 1),
          ('weapon', 2),
          ('cauchemar', 1),
          ('nightmare', 2),
          ('deceitful', 2),
          ('malhonnête', 1),
          ('trompeur', 1),
          ('bad dream', 2);

INSERT INTO `translations`(`wordTranslatedId`, `wordTranslatorId`)
    VALUES(1, 2),
          (3, 4),
          (5, 6),
          (7, 8),
          (7, 9);