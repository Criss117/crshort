DROP INDEX `click_events_link_created_at_idx`;--> statement-breakpoint
DROP INDEX `click_events_created_at_idx`;--> statement-breakpoint
DROP INDEX `click_events_country_idx`;--> statement-breakpoint
CREATE INDEX `click_events_link_clicked_at_idx` ON `click_events` (`link_id`,`clicked_at`);--> statement-breakpoint
CREATE INDEX `click_events_clicked_at_idx` ON `click_events` (`clicked_at`);--> statement-breakpoint
CREATE INDEX `click_events_link_country_idx` ON `click_events` (`link_id`,`country_code`);--> statement-breakpoint
CREATE INDEX `click_events_link_device_type_idx` ON `click_events` (`link_id`,`device_type`);