-- source Projects/learn_languages_api/scripts/create_tables.sql

DROP TABLE IF EXISTS `translations`;
DROP TABLE IF EXISTS `words`;
DROP TABLE IF EXISTS `languages`;
DROP TABLE IF EXISTS `users`;

CREATE TABLE IF NOT EXISTS `users`(
    `userId` INT AUTO_INCREMENT,
    `username` VARCHAR(50) NOT NULL,
    `password` VARCHAR(32),
    PRIMARY KEY(`userId`)
);

CREATE TABLE IF NOT EXISTS `languages`(
    `languageId` INT AUTO_INCREMENT,
    `name` VARCHAR(10),
    PRIMARY KEY(`languageId`)
);

CREATE TABLE IF NOT EXISTS `words`(
    `wordId` INT AUTO_INCREMENT,
    `name` VARCHAR(50),
    `languageId` INT,
    PRIMARY KEY(`wordId`),
    FOREIGN KEY(`languageId`) REFERENCES `languages`(`languageId`)
);

CREATE TABLE IF NOT EXISTS `translations`(
    `wordTranslatedId` INT,
    `wordTranslationId` INT,
    PRIMARY KEY(`wordTranslatedId`, `wordTranslationId`),
    FOREIGN KEY(`wordTranslatedId`) REFERENCES `words`(`wordId`),
    FOREIGN KEY(`wordTranslationId`) REFERENCES `words`(`wordId`)
);

