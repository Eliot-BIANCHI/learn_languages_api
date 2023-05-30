-- source Projects/learn_languages_api/scripts/create_tables.sql

DROP TABLE IF EXISTS `translations`;
DROP TABLE IF EXISTS `words`;
DROP TABLE IF EXISTS `languages`;
DROP TABLE IF EXISTS `grammaticalCategories`;
DROP TABLE IF EXISTS `users`;

CREATE TABLE IF NOT EXISTS `users`(
    `userId` INT AUTO_INCREMENT,
    `username` VARCHAR(50) UNIQUE NOT NULL,
    `password` VARCHAR(32) NOT NULL,
    PRIMARY KEY(`userId`)
);

CREATE TABLE IF NOT EXISTS `languages`(
    `languageId` INT AUTO_INCREMENT,
    `name` VARCHAR(10) UNIQUE NOT NULL,
    PRIMARY KEY(`languageId`)
);

CREATE TABLE IF NOT EXISTS `grammaticalCategories`(
    `grammaticalCategoryId`INT AUTO_INCREMENT,
    `name` VARCHAR(12) UNIQUE NOT NULL,
    PRIMARY KEY(`grammaticalCategoryId`)
);

CREATE TABLE IF NOT EXISTS `words`(
    `wordId` INT AUTO_INCREMENT,
    `name` VARCHAR(50) UNIQUE,
    `languageId` INT NOT NULL,
    `grammaticalCategoryId` INT NOT NULL,
    PRIMARY KEY(`wordId`),
    FOREIGN KEY(`languageId`) 
        REFERENCES `languages`(`languageId`),
    FOREIGN KEY(`grammaticalCategoryId`) 
        REFERENCES `grammaticalCategories`(`grammaticalCategoryId`)
);

CREATE TABLE IF NOT EXISTS `translations`(
    `wordTranslatedId` INT,
    `wordTranslatorId` INT,
    PRIMARY KEY(`wordTranslatedId`, `wordTranslatorId`),
    FOREIGN KEY(`wordTranslatedId`)
        REFERENCES `words`(`wordId`)
        ON DELETE CASCADE,
    FOREIGN KEY(`wordTranslatorId`)
        REFERENCES `words`(`wordId`)
        ON DELETE CASCADE
);
