CREATE TABLE tasks (
	"id" SERIAL PRIMARY KEY,
	"description" varchar(128),
	"complete" boolean DEFAULT false
)

INSERT INTO tasks (description) VALUES ('compliment the dog');
INSERT INTO tasks (description) VALUES ('give snacks to the dog');
SELECT * FROM tasks ORDER BY id ASC;
UPDATE tasks SET complete = true WHERE id=1;
DELETE FROM tasks WHERE id=1;
-- for sort button:
SELECT * FROM tasks ORDER BY complete DESC;