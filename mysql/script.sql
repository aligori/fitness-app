CREATE TABLE test (
    firstname VARCHAR(255),
    lastname VARCHAR(255),
    email VARCHAR(255)
);


CREATE TABLE `USER`(
    id INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(60),
    password VARCHAR(25),
    username VARCHAR(15),
    PRIMARY KEY(id),
    UNIQUE(email),
    UNIQUE(username)
);

CREATE TABLE GYM_GOER(
    goer_id INT,
    weight INT,
    height INT,
    birthday DATE,
    age INT AS (DATEDIFF(NOW(), birthday)),--SQL Server code
    membership_type VARCHAR(5),
    PRIMARY KEY(goer_id),
    FOREIGN KEY (goer_id) REFERENCES `USER` (id) ON DELETE CASCADE
);

CREATE TABLE FITNESS_INFLUENCER(
    influencer_id INT,
    first_name VARCHAR(15),
    last_name VARCHAR(25),
    experience INT,
    --photo
    website VARCHAR(50),
    bio VARCHAR(500),
    PRIMARY KEY(influencer_id),
    FOREIGN KEY (influencer_id) REFERENCES`USER` (id) ON DELETE CASCADE
);

CREATE TABLE PLAN(
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(50),
    description VARCHAR(500),
    goal VARCHAR(50),
    duration INT,--number of weeks to complete plan
    created_at DATE,
    PRIMARY KEY(id)
);

CREATE TABLE WORKOUT(
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(50),
    difficulty VARCHAR(20),
    duration TIME,
    --image
    scheduled_day INT,
    PRIMARY KEY(id)
);

CREATE TABLE CATEGORY(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),
    description VARCHAR(500),
    --image
    PRIMARY KEY(id)
);

--weak entity
CREATE TABLE `SET`(
    set_no INT,
    workout_id INT,
    composed_of INT,
    reps INT,
    break_time TIME,
    calories INT,

    PRIMARY KEY(set_no, workout_id),
    FOREIGN KEY (workout_id) REFERENCES WORKOUT (id) ON DELETE CASCADE,
    FOREIGN KEY (composed_of) REFERENCES EXERCISE(id) ON DELETE CASCADE
);

CREATE TRIGGER calculate_calories_trigger
BEFORE INSERT ON `SET` FOR EACH ROW
BEGIN
    DECLARE exercise_calories INT;
    SELECT calories_burned INTO exercise_calories FROM EXERCISE WHERE id = NEW.composed_of;
    SET NEW.calories = exercise_calories * NEW.reps;
END;

CREATE TABLE EXERCISE(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50),
    description VARCHAR(500),
    --image
    equipment VARCHAR(100),
    calories_burned INT,
    muscle_group VARCHAR(50),
    PRIMARY KEY(id)
);

--gym goer connects with gym goer: many to many
    --create new table
CREATE TABLE FRIENDSHIP(
    goer_a_id INT,
    goer_b_id INT,

    PRIMARY KEY(goer_a_id, goer_b_id)
    FOREIGN KEY (goer_a_id) REFERENCES GYM_GOER (goer_id) ON DELETE CASCADE,
    FOREIGN KEY (goer_b_id) REFERENCES GYM_GOER (goer_id) ON DELETE CASCADE
);

--gym goer completes workout: many to many (+ date)
    --create new table
CREATE TABLE GYM_GOER_WORKOUT(
    goer_id INT,
    workout_id INT,
    completed_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    PRIMARY KEY(goer_id, workout_id),
    FOREIGN KEY (goer_id) REFERENCES GYM_GOER (goer_id) ON DELETE CASCADE,
    FOREIGN KEY (workout_id) REFERENCES WORKOUT (id) ON DELETE SET NULL,
);

--gym goer subscribes to plan: many to many (+ date)
    --create new table
CREATE TABLE SUBSCRIPTION(
    goer_id INT,
    plan_id INT,
    subscribe_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY(goer_id, plan_id),
    FOREIGN KEY (goer_id) REFERENCES GYM_GOER (goer_id) ON DELETE CASCADE,
    FOREIGN KEY (plan_id) REFERENCES PLAN (id) ON DELETE SET NULL
);

--gym goer follows fitness influencer: many to many
    --create new table
CREATE TABLE FOLLOWER(
    goer_id INT,
    influencer_id INT,

    PRIMARY KEY(goer_id, influencer_id),
    FOREIGN KEY (goer_id) REFERENCES GYM_GOER (goer_id) ON DELETE CASCADE,
    FOREIGN KEY (influencer_id) REFERENCES FITNESS_INFLUENCER (id) ON DELETE SET NULL
);

--fitness influencer creates workout: 1 to many

--fitness influencer creates plan: 1 to many

--plan contain worksouts: 1 to many

--plan belongs to category: many to 1

--workout contains sets: 1 to many
--set is weak entity

--set specifies exercise: many to 1

