CREATE TABLE `buku` (
	`id` int AUTO_INCREMENT NOT NULL,
	`judul` varchar(200) NOT NULL,
	`penulis` varchar(100) NOT NULL,
	`penerbit` varchar(100) NOT NULL,
	`tahun_terbit` int NOT NULL,
	`stok` int NOT NULL,
	`id_kategori` int NOT NULL,
	`id_rak` int NOT NULL,
	CONSTRAINT `buku_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `rak` (
	`id` int AUTO_INCREMENT NOT NULL,
	`kode_rak` varchar(20) NOT NULL,
	`lokasi` varchar(100) NOT NULL,
	CONSTRAINT `rak_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `kategori_buku` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nama_kategori` varchar(100) NOT NULL,
	CONSTRAINT `kategori_buku_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `buku` ADD CONSTRAINT `buku_id_kategori_kategori_buku_id_fk` FOREIGN KEY (`id_kategori`) REFERENCES `kategori_buku`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `buku` ADD CONSTRAINT `buku_id_rak_rak_id_fk` FOREIGN KEY (`id_rak`) REFERENCES `rak`(`id`) ON DELETE no action ON UPDATE no action;