/*Posgresql database*/
DROP TABLE IF EXISTS RECIPIES;
DROP TABLE IF EXISTS USERS;
DROP TABLE IF EXISTS META;
DROP TYPE IF EXISTS Role;
Create TABLE IF NOT EXISTS META (
    id uuid NOT NULL,
    create_date TIMESTAMP,
    edit_date TIMESTAMP,
    UNIQUE(id)
);
CREATE TYPE Role as ENUM ('User', 'Admin', 'SuperAdmin'); 
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

-- -- Create a function to convert string ID to UUID
-- CREATE OR REPLACE FUNCTION convert_id_to_uuid(string_id TEXT)
-- RETURNS UUID
-- AS $$
-- BEGIN
--     -- Attempt to convert the string ID to UUID and return the result
--     RETURN string_id::UUID;
-- EXCEPTION
--     -- Catch any conversion errors and return NULL
--     WHEN others THEN
--         RETURN NULL;
-- END;
-- $$ LANGUAGE plpgsql;

-- -- Create a trigger function to automatically convert string ID to UUID before insert
-- CREATE OR REPLACE FUNCTION before_insert_users()
-- RETURNS TRIGGER
-- AS $$
-- BEGIN
--     -- Convert the string ID provided in NEW.id to UUID
--     NEW.id = convert_id_to_uuid(NEW.id::TEXT);
    
--     -- Return the NEW row after conversion
--     RETURN NEW;
-- END;
-- $$ LANGUAGE plpgsql;

-- -- Create a trigger that fires before inserting into the USERS table
-- CREATE TRIGGER trigger_before_insert_users
-- BEFORE INSERT ON USERS
-- FOR EACH ROW
-- EXECUTE FUNCTION before_insert_users();