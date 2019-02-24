CREATE DATABASE source default character set utf8;

CREATE TABLE source.user (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(1000) NOT NULL,
    role VARCHAR(1000) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB CHARACTER SET utf8 COLLATE utf8_bin;

INSERT INTO source.user (name, role) VALUES ('tasuwo', 'admin');
INSERT INTO source.user (name, role) VALUES ('taro', 'developer');
INSERT INTO source.user (name, role) VALUES ('hanako', 'developer');