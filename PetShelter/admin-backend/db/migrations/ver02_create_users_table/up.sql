CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR DEFAULT NULL,
    last_name VARCHAR DEFAULT NULL,
    email VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    meta_id INTEGER NOT NULL,
    role TEXT CHECK(role in('User', 'Admin')) NOT NULL DEFAULT 'User',
    FOREIGN KEY(meta_id) REFERENCES meta(id)

);