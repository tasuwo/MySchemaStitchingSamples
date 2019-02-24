CREATE DATABASE source default character set utf8;

CREATE TABLE source.item (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(1000) NOT NULL,
    type VARCHAR(1000) NOT NULL,
    user_id BIGINT UNSIGNED NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB CHARACTER SET utf8 COLLATE utf8_bin;

INSERT INTO source.item (name, type, user_id) VALUES ('A', 'hoge', 1);
INSERT INTO source.item (name, type, user_id) VALUES ('B', 'fuga', 1);
INSERT INTO source.item (name, type, user_id) VALUES ('C', 'hoge', 2);
INSERT INTO source.item (name, type, user_id) VALUES ('D', 'fuga', 3);