/*Posgresql database*/
DROP TABLE IF EXISTS ADDRESS_CONNECTION CASCADE;
DROP TABLE IF EXISTS ADDRESS CASCADE;
DROP TABLE IF EXISTS AUTHENTICATION CASCADE;
DROP TABLE if EXISTS USERS_CONTRACTS CASCADE;
DROP TABLE IF EXISTS USERS cascade;
DROP TABLE IF EXISTS META cascade;
DROP TABLE IF EXISTS EVENTS cascade;
DROP TABLE IF EXISTS EMPLOYEE_CONNECTION CASCADE;
DROP TYPE IF EXISTS Role;
DROP TYPE IF EXISTS State;
DROP TYPE IF EXISTS Gender;
DROP TYPE IF EXISTS EventType;
DROP VIEW IF EXISTS ADDRESSUSERS;
DROP VIEW IF EXISTS USERLOGIN;
CREATE TYPE Gender as ENUM ('Man', 'Woman', 'None');
CREATE TYPE Role as ENUM (
    'User',
    'Admin',
    'SuperAdmin',
    'Employee',
    'Manager',
    'Director'
);
CREATE TYPE EventType as ENUM ('Create', 'Delete', 'Update');
CREATE TYPE State as ENUM (
    'Draft',
    'Active',
    'Suspend',
    'Frozen',
    'Retired',
    'Deleted'
);
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
CREATE TABLE IF NOT EXISTS AUTHENTICATION (
    user_id uuid not null,
    username VARCHAR(255) NOT NULL,
    password text not null,
    passowrd_is_temporary boolean DEFAULT FALSE
);
CREATE TABLE IF NOT EXISTS USERS (
    id uuid NOT NULL,
    first_name varchar(255) DEFAULT '',
    last_name varchar(255) DEFAULT '',
    brithday TIMESTAMPTZ DEFAULT now(),
    email VARCHAR(255) NOT NULL,
    gender Gender DEFAULT 'None',
    meta_id uuid,
    role Role DEFAULT 'User',
    current_state State DEFAULT 'Draft',
    previous_state State DEFAULT NULL,
    contract_id uuid DEFAULT NULL,
    fax TEXT DEFAULT NULL,
    phone TEXT DEFAULT NULL,
    PRIMARY KEY (id),
    UNIQUE(id),
    CONSTRAINT fk_meta FOREIGN KEY(meta_id) REFERENCES META(id) ON DELETE CASCADE
);
INSERT into META (id, create_date, edit_date)
values (
        '63c23f3f-1179-4190-8deb-c4bae7f5c0c0',
        '2024-05-05 19:10:25-07',
        '2024-05-05 19:10:25-07'
    ),
    (
        '63c23f3e-1179-4190-8deb-c4bae7f5c0c0',
        '2024-05-05 19:10:25-07',
        '2024-05-05 19:10:25-07'
    ),
    (
        '63c23f3c-1179-4190-8deb-c4bae7f5c0c0',
        '2024-05-05 19:10:25-07',
        '2024-05-05 19:10:25-07'
    );
insert into USERS (
        id,
        email,
        meta_id,
        role,
        current_state
    )
values (
        'd410c8d1-cf55-47cb-b8c1-cb2d95d82846',
        'admin@admin.com',
        '63c23f3f-1179-4190-8deb-c4bae7f5c0c0',
        'SuperAdmin',
        'Active'
    ),
    (
        'd410c8d2-cf55-47cb-b8c1-cb2d95d82846',
        'manager@example.com',
        '63c23f3e-1179-4190-8deb-c4bae7f5c0c0',
        'Manager',
        'Active'
    ),
    (
        'd410c8d3-cf55-47cb-b8c1-cb2d95d82846',
        'director@example.com',
        '63c23f3c-1179-4190-8deb-c4bae7f5c0c0',
        'Director',
        'Active'
    );
insert into Authentication(user_id, username, password)
values (
        'd410c8d1-cf55-47cb-b8c1-cb2d95d82846',
        'admin',
        '$2y$10$17C2N8nNhQgGxFQAZenHs.u0Qa2DD0aeAe5wIXwWej9fihtFE1rQO'
    ),
    (
        'd410c8d2-cf55-47cb-b8c1-cb2d95d82846',
        'manager',
        '$2y$10$17C2N8nNhQgGxFQAZenHs.u0Qa2DD0aeAe5wIXwWej9fihtFE1rQO'
    ),
    (
        'd410c8d3-cf55-47cb-b8c1-cb2d95d82846',
        'director',
        '$2y$10$17C2N8nNhQgGxFQAZenHs.u0Qa2DD0aeAe5wIXwWej9fihtFE1rQO'
    );
CREATE TABLE IF NOT EXISTS ADDRESS_CONNECTION (
    entity_id uuid not null,
    address_id uuid not null,
    UNIQUE(address_id)
);
CREATE TABLE IF NOT EXISTS ADDRESS (
    id uuid NOT NULL,
    address VARCHAR(255) NOT NULL,
    house VARCHAR(255) NOT NULL,
    door VARCHAR(255) DEFAULT NULL,
    city VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL,
    lat real DEFAULT null,
    long real DEFAULT null,
    postal_code TEXT DEFAULT NULL,
    CONSTRAINT fk_address_connection FOREIGN KEY(id) REFERENCES ADDRESS_CONNECTION(address_id) ON DELETE CASCADE
);
CREATE view ADDRESSUSERS as (
    select users.id,
        users.email,
        users.first_name,
        users.last_name,
        users.role,
        users.current_state,
        users.previous_state,
        users.brithday,
        users.contract_id,
        users.gender,
        users.phone,
        users.fax,
        auth.username,
        auth.password,
        meta.create_date,
        meta.edit_date,
        users.meta_id,
        addr.address,
        addr.house,
        addr.door,
        addr.city,
        addr.country,
        addr.lat,
        addr.long
    from users
        join meta on meta.id = users.meta_id
        join authentication as auth on auth.user_id = users.id
        left outer join address as addr on addr.id in (
            select address_id
            from address_connection
            where entity_id = users.id
        )
);
create view USERLOGIN as (
    select users.id,
        users.email,
        users.first_name,
        users.last_name,
        users.role,
        users.current_state,
        users.previous_state,
        users.brithday,
        users.contract_id,
        users.gender,
        users.phone,
        users.fax,
        auth.username,
        auth.password,
        auth.passowrd_is_temporary,
        meta.create_date,
        meta.edit_date,
        users.meta_id
    from users
        join meta on meta.id = users.meta_id
        join authentication as auth on auth.user_id = users.id
);
CREATE TABLE IF NOT EXISTS EMPLOYEE_CONNECTION (
    owner_id uuid not null,
    user_id uuid not null
);