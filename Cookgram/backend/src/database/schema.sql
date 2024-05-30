/*Posgresql database*/
DROP TABLE IF EXISTS USERS;
DROP TABLE IF EXISTS META;
DROP TABLE IF EXISTS EVENTS;
DROP TABLE IF EXISTS ADDRESS_CONNECTION;
DROP TABLE IF EXISTS ADDRESS;
DROP TYPE IF EXISTS Role;
DROP TYPE IF EXISTS EventType;
CREATE TYPE Role as ENUM (
    'User',
    'Admin',
    'SuperAdmin',
    'Employee',
    'Manager',
    'Director'
);
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
CREATE TABLE IF NOT EXISTS ADDRESS_CONNECTION (
    entity_id uuid not null,
    address_id uuid not null
) 

CREATE TABLE IF NOT EXISTS ADDRESS (
    id uuid NOT NULL,
    house VARCHAR(255) NOT NULL,
    door VARCHAR(255) DEFAULT NULL,
    city VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL,
    lat real,
    long real,
    postal_code TEXT DEFAULT NULL,
    fax TEXT DEFAULT NULL,
    phone TEXT DEFAULT NULL,
    CONSTRAINT fk_address_connection FOREIGN KEY(id) REFERENCES ADDRESS_CONNECTION(address_id) ON DELETE CASCADE,
)