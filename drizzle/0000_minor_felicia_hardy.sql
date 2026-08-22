CREATE TABLE `click_events` (
	`id` text PRIMARY KEY NOT NULL,
	`link_id` text NOT NULL,
	`clicked_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`hashed_ip` text(64) NOT NULL,
	`user_agent` text,
	`device_type` text DEFAULT 'unknown' NOT NULL,
	`referrer` text(2048),
	`referrer_host` text(253),
	`country_code` text(2),
	`city` text,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	FOREIGN KEY (`link_id`) REFERENCES `link`(`id`) ON UPDATE no action ON DELETE cascade,
	CONSTRAINT "click_events_device_type_check" CHECK("click_events"."device_type" in ('desktop', 'mobile', 'tablet', 'bot', 'unknown'))
);
--> statement-breakpoint
CREATE INDEX `click_events_link_created_at_idx` ON `click_events` (`link_id`,`created_at`);
--> statement-breakpoint
CREATE INDEX `click_events_created_at_idx` ON `click_events` (`created_at`);
--> statement-breakpoint
CREATE INDEX `click_events_country_idx` ON `click_events` (`country_code`);
