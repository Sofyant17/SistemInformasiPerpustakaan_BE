CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nama` varchar(100) NOT NULL,
	`email` varchar(100) NOT NULL,
	`password` varchar(255) NOT NULL,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
