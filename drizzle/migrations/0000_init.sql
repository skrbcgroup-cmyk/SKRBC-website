CREATE TABLE `admin_users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text NOT NULL,
	`name` text NOT NULL,
	`password_hash` text NOT NULL,
	`last_login_at` integer,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `admin_users_email_unique` ON `admin_users` (`email`);--> statement-breakpoint
CREATE TABLE `articles` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`slug` text NOT NULL,
	`title` text NOT NULL,
	`excerpt` text DEFAULT '' NOT NULL,
	`category` text DEFAULT '' NOT NULL,
	`content` text DEFAULT '' NOT NULL,
	`cover_image_key` text,
	`cover_image_alt` text,
	`seo_title` text,
	`seo_description` text,
	`status` text DEFAULT 'draft' NOT NULL,
	`published_at` integer,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `articles_slug_unique` ON `articles` (`slug`);--> statement-breakpoint
CREATE INDEX `articles_status_published_idx` ON `articles` (`status`,`published_at`);--> statement-breakpoint
CREATE TABLE `case_studies` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`slug` text NOT NULL,
	`title` text NOT NULL,
	`client` text DEFAULT '' NOT NULL,
	`service` text DEFAULT '' NOT NULL,
	`summary` text DEFAULT '' NOT NULL,
	`client_project` text DEFAULT '' NOT NULL,
	`challenge` text DEFAULT '' NOT NULL,
	`assessment` text DEFAULT '' NOT NULL,
	`recommendations` text DEFAULT '' NOT NULL,
	`consulting_support` text DEFAULT '' NOT NULL,
	`outcome` text DEFAULT '' NOT NULL,
	`cover_image_key` text,
	`cover_image_alt` text,
	`seo_title` text,
	`seo_description` text,
	`status` text DEFAULT 'draft' NOT NULL,
	`published_at` integer,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `case_studies_slug_unique` ON `case_studies` (`slug`);--> statement-breakpoint
CREATE INDEX `case_studies_status_published_idx` ON `case_studies` (`status`,`published_at`);--> statement-breakpoint
CREATE TABLE `inquiries` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`full_name` text NOT NULL,
	`company_name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text NOT NULL,
	`service` text NOT NULL,
	`message` text NOT NULL,
	`contact_method` text,
	`best_time` text,
	`status` text DEFAULT 'new' NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE INDEX `inquiries_status_created_idx` ON `inquiries` (`status`,`created_at`);--> statement-breakpoint
CREATE TABLE `login_attempts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`ip_hash` text NOT NULL,
	`email` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE INDEX `login_attempts_ip_time_idx` ON `login_attempts` (`ip_hash`,`created_at`);--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` integer NOT NULL,
	`expires_at` integer NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `admin_users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `sessions_user_idx` ON `sessions` (`user_id`);