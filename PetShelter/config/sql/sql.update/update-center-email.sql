ALTER TABLE centers
ADD email TEXT;
UPDATE centers
SET email = 'example@example.com';