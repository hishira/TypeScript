CREATE TABLE shelters (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone_number TEXT,
    email TEXT,
    user_id INTEGER,
    address_id INTEGER,
    meta_id INTEGER DEFAULT NULL,
    FOREIGN KEY(meta_id) REFERENCES meta(id),
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(address_id) REFERENCES addresses(id)
);