CREATE TABLE pettypes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    value TEXT NOT NULL,
    visible BOOLEAN NOT NULL CHECK (visible IN (0,1))
);

INSERT INTO pettypes (value, visible) VALUES ("Dog",1 ), ("Cat", 1);
