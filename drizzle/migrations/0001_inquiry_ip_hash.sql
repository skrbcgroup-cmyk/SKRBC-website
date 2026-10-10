ALTER TABLE `inquiries` ADD `ip_hash` text;--> statement-breakpoint
CREATE INDEX `inquiries_ip_created_idx` ON `inquiries` (`ip_hash`,`created_at`);