CREATE DATABASE source default character set utf8;

CREATE TABLE source.item (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(1000) NOT NULL,
    type VARCHAR(1000) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB CHARACTER SET utf8 COLLATE utf8_bin;

INSERT INTO source.item (name, type) VALUES ('A', 'hoge');
INSERT INTO source.item (name, type) VALUES ('B', 'fuga');
INSERT INTO source.item (name, type) VALUES ('C', 'hoge');
INSERT INTO source.item (name, type) VALUES ('D', 'fuga');