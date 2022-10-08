CREATE TABLE pets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT DEFAULT NULL,
    pettype_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    FOREIGN KEY(pettype_id) REFERENCES pettypes(id),
    FOREIGN KEY(user_id) REFERENCES users(id)
);