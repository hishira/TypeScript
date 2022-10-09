CREATE TABLE addresses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    country TEXT,
    city TEXT,
    lt REAL,
    lg REAL,
    street TEXT,
    housenumber TEXT,
    meta_id INTEGER DEFAULT NULL,
    FOREIGN KEY(meta_id) REFERENCES meta(id)
);