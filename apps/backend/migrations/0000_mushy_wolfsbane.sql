CREATE TABLE `articles` (
	`id` text PRIMARY KEY NOT NULL,
	`url` text NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`source` text NOT NULL,
	`category` text NOT NULL,
	`published_at` text,
	`fetched_at` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`summary_ja` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `articles_url_unique` ON `articles` (`url`);--> statement-breakpoint
CREATE INDEX `idx_articles_status` ON `articles` (`status`);--> statement-breakpoint
CREATE INDEX `idx_articles_category` ON `articles` (`category`);--> statement-breakpoint
CREATE INDEX `idx_articles_fetched` ON `articles` (`fetched_at`);--> statement-breakpoint
CREATE TABLE `digests` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`date` text NOT NULL,
	`category` text NOT NULL,
	`digest_ja` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `uq_digests_date_category` ON `digests` (`date`,`category`);