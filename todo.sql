CREATE TABLE `todo` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'PK',
  `contents` VARCHAR(100) NOT NULL DEFAULT '' COMMENT 'todo 내용',
  `is_done` TINYINT NOT NULL DEFAULT 0 COMMENT '완료 여부',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성일',
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '수정일',
  `deleted_at` DATETIME NULL COMMENT '삭제일',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT 'todo';
