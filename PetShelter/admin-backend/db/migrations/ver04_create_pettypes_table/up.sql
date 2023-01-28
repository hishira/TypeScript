CREATE TABLE pettypes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    value TEXT NOT NULL,
    visible BOOLEAN NOT NULL CHECK (visible IN (0,1)),
    meta_id INTEGER DEFAULT NULL,
    FOREIGN KEY(meta_id) REFERENCES meta(id)
);

INSERT INTO pettypes (value, visible) VALUES ("Dog",1 ), ("Cat", 1);
