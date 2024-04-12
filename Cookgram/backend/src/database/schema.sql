/*Posgresql database*/
DROP TABLE IF EXISTS RECIPIES;
DROP TABLE IF EXISTS USERS;
DROP TABLE IF EXISTS META;
DROP TABLE IF EXISTS EVENTS;
DROP TYPE IF EXISTS Role;
DROP TYPE IF EXISTS EventType;

CREATE TYPE Role as ENUM ('User', 'Admin', 'SuperAdmin'); 
CREATE TYPE EventType as ENUM ('Create', 'Delete', 'Update'); 
/* For now store in SQL database*/
CREATE TABLE IF NOT EXISTS EVENTS (
    id uuid not null,
    created_date TIMESTAMP not null,
    event_type EventType,
    related_entity uuid not null,
    completed boolean
);
Create TABLE IF NOT EXISTS META (
    id uuid NOT NULL,
    create_date TIMESTAMP,
    edit_date TIMESTAMP,
    UNIQUE(id)
);
CREATE TABLE IF NOT EXISTS USERS (
    id uuid NOT NULL,
    username VARCHAR(255) NOT NULL,
    password text NOT NULL,
    email VARCHAR(255) NOT NULL,
    meta_id uuid,
    PRIMARY KEY (id),
    UNIQUE(id),
    role Role DEFAULT 'User',
    CONSTRAINT fk_meta FOREIGN KEY(meta_id) REFERENCES META(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS RECIPIES (
    id uuid NOT NULL,
    recipie TEXT NOT NULL,
    meta_id uuid,
    user_id uuid,
    UNIQUE(id),
    CONSTRAINT fk_meta FOREIGN KEY(meta_id) REFERENCES META(id) ON DELETE CASCADE,
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES USERS(id) on DELETE CASCADE
);
