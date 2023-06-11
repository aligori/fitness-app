CREATE TABLE user(
    id INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(60),
    password VARCHAR(32),
    username VARCHAR(32),
    avatar VARCHAR(2083),
    PRIMARY KEY(id),
    UNIQUE(email),
    UNIQUE(username)
);

CREATE TABLE gym_goer(
    goer_id INT,
    weight FlOAT,
    height FLOAT,
    age INT,
    birthday DATE,
    membership_type ENUM('free', 'basic', 'silver', 'gold'),
    PRIMARY KEY(goer_id),
    FOREIGN KEY (goer_id) REFERENCES user (id) ON DELETE CASCADE
);

DELIMITER //

CREATE TRIGGER calculate_age_trigger
    BEFORE INSERT ON gym_goer
    FOR EACH ROW
BEGIN
    SET NEW.age = FLOOR(DATEDIFF(CURDATE(), NEW.birthday) / 365.25);
END;//

DELIMITER ;

CREATE TABLE fitness_influencer(
    influencer_id INT,
    first_name VARCHAR(32),
    last_name VARCHAR(32),
    experience INT,
    photo VARCHAR(2083),
    website VARCHAR(2083),
    bio TEXT,
    PRIMARY KEY(influencer_id),
    FOREIGN KEY (influencer_id) REFERENCES user (id) ON DELETE CASCADE
);

CREATE TABLE category(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50),
    description TEXT,
    image VARCHAR(2083),
    PRIMARY KEY(id)
);

CREATE TABLE exercise(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50),
    description TEXT,
    image VARCHAR(2083),
    equipment VARCHAR(256),
    calories_burned FLOAT,
    muscle_groups JSON,
    PRIMARY KEY(id)
);

CREATE TABLE plan(
    id INT NOT NULL auto_increment,
    title VARCHAR(100),
    description TEXT,
    goal VARCHAR(100),
    duration INT, -- number of days
    created_at DATE,
    influencer_id int not null,
    category_id int,
    PRIMARY KEY(id),
    FOREIGN KEY (influencer_id) REFERENCES fitness_influencer (influencer_id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES category (id) ON DELETE SET NULL
);

CREATE TABLE workout(
    id INT NOT NULL auto_increment,
    title VARCHAR(50),
    difficulty ENUM('easy', 'medium', 'hard'),
    duration INT, -- number of minutes
    image VARCHAR(2083),
    scheduled_day INT,
    plan_id INT,
    influencer_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (plan_id) REFERENCES plan (id) ON DELETE CASCADE,
    FOREIGN KEY (influencer_id) REFERENCES fitness_influencer (influencer_id) ON DELETE CASCADE
);

-- weak entity
CREATE TABLE `set`(
    set_no INT,
    workout_id INT NOT NULL,
    exercise_id INT NOT NULL,
    reps INT,
    break_time TIME,
    calories FLOAT,

    PRIMARY KEY(set_no, workout_id),
    FOREIGN KEY (workout_id) REFERENCES workout (id) ON DELETE CASCADE,
    FOREIGN KEY (exercise_id) REFERENCES exercise(id) ON DELETE CASCADE
);

DELIMITER //
CREATE TRIGGER calculate_calories_trigger
    BEFORE INSERT ON `set` FOR EACH ROW
BEGIN
    DECLARE exercise_calories FLOAT;
    SELECT calories_burned INTO exercise_calories FROM exercise WHERE id = NEW.exercise_id;
    SET NEW.calories = exercise_calories * NEW.reps;
END //
DELIMITER ;

-- gym goer subscribes to plan: many to many (+ date)
CREATE TABLE subscription(
    goer_id INT NOT NULL,
    plan_id INT NOT NULL,
    subscribe_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (goer_id, plan_id),
    FOREIGN KEY (goer_id) REFERENCES gym_goer (goer_id) ON DELETE CASCADE,
    FOREIGN KEY (plan_id) REFERENCES plan (id) ON DELETE CASCADE
);

-- gym goer completes workout: many to many (+ date)
CREATE TABLE gym_goer_workout(
    goer_id INT,
    workout_id INT,
    completed_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(goer_id, workout_id),
    FOREIGN KEY (goer_id) REFERENCES gym_goer (goer_id) ON DELETE CASCADE,
    FOREIGN KEY (workout_id) REFERENCES workout (id) ON DELETE CASCADE
);

--
-- --gym goer connects with gym goer: many to many
--     --create new table
-- CREATE TABLE FRIENDSHIP(
--     goer_a_id INT,
--     goer_b_id INT,
--
--     PRIMARY KEY(goer_a_id, goer_b_id)
--     FOREIGN KEY (goer_a_id) REFERENCES GYM_GOER (goer_id) ON DELETE CASCADE,
--     FOREIGN KEY (goer_b_id) REFERENCES GYM_GOER (goer_id) ON DELETE CASCADE
-- );
--
-- --gym goer follows fitness influencer: many to many
--     --create new table
-- CREATE TABLE FOLLOWER(
--     goer_id INT,
--     influencer_id INT,
--
--     PRIMARY KEY(goer_id, influencer_id),
--     FOREIGN KEY (goer_id) REFERENCES GYM_GOER (goer_id) ON DELETE CASCADE,
--     FOREIGN KEY (influencer_id) REFERENCES FITNESS_INFLUENCER (id) ON DELETE SET NULL
-- );
--
-- --fitness influencer creates workout: 1 to many
--
-- --fitness influencer creates plan: 1 to many
--
-- --plan contain worksouts: 1 to many
--
-- --plan belongs to category: many to 1
--
-- --workout contains sets: 1 to many
-- --set is weak entity
--
-- --set specifies exercise: many to 1
--
