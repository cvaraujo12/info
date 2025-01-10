CREATE TABLE `analysis` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`content` text NOT NULL,
	`summary` text NOT NULL,
	`author` text NOT NULL,
	`category` text NOT NULL,
	`tags` text,
	`image_url` text,
	`published_at` integer NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `news` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`content` text NOT NULL,
	`summary` text NOT NULL,
	`image_url` text,
	`source` text,
	`published_at` integer NOT NULL,
	`category` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `projects` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`country` text NOT NULL,
	`status` text NOT NULL,
	`type` text NOT NULL,
	`investment` real,
	`start_date` integer,
	`end_date` integer,
	`latitude` real,
	`longitude` real,
	`image_url` text,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `routes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`type` text NOT NULL,
	`description` text NOT NULL,
	`countries` text NOT NULL,
	`length` real,
	`status` text NOT NULL,
	`start_point` text NOT NULL,
	`end_point` text NOT NULL,
	`waypoints` text,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `statistics` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`country` text NOT NULL,
	`year` integer NOT NULL,
	`investment` real NOT NULL,
	`project_count` integer NOT NULL,
	`trade_volume` real NOT NULL,
	`gdp_impact` real,
	`employment_impact` integer,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL
);
