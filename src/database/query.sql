CREATE TABLE users(
	id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE studies(
    id SERIAL PRIMARY KEY,
    study VARCHAR(50) UNIQUE NOT NULL,
  user_id INT REFERENCES users(id)
);

CREATE TABLE topics(
	id SERIAL PRIMARY KEY,
    topic VARCHAR(50) UNIQUE NOT NULL,
  user_id INT REFERENCES users(id)
);

CREATE TABLE user_topics(
id SERIAL PRIMARY KEY,
  study_id INT REFERENCES studies(id),
  topic_id INT REFERENCES topics(id),
  user_id INT REFERENCES users(id),
  	last_change TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE courses(
	id SERIAL PRIMARY KEY,
  	course VARCHAR(50) NOT NULL,
  	description VARCHAR(250) NOT NULL,
  	link VARCHAR(200) NOT NULL,
  	done BOOLEAN DEFAULT FALSE,
  	last_change TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  	user_id INT REFERENCES users(id),
  	topic_id INT REFERENCES topics(id),
  userTopics_id INT REFERENCES user_topics(id)
);

CREATE TABLE lessons_course(
	id SERIAL PRIMARY KEY,
  	lesson VARCHAR(150) NOT NULL,
  	done BOOLEAN DEFAULT FALSE,
  	last_change TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  	course_id INT REFERENCES courses(id),
  	user_id INT REFERENCES users(id)  	
);

CREATE TABLE videos(
	id SERIAL PRIMARY KEY,
  	video VARCHAR(50) NOT NULL,
  	description VARCHAR(250) NOT NULL,
  	link VARCHAR(200) NOT NULL,
  	done BOOLEAN DEFAULT FALSE,
    last_change TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  	user_id INT REFERENCES users(id),
  	topic_id INT REFERENCES topics(id),
  userTopics_id INT REFERENCES user_topics(id)
);

CREATE TABLE articles(
	id SERIAL PRIMARY KEY,
  	article VARCHAR(50) NOT NULL,
  	description VARCHAR(250) NOT NULL,
  	link VARCHAR(200) NOT NULL,
  	done BOOLEAN DEFAULT FALSE,
    last_change TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  	user_id INT REFERENCES users(id),
  	topic_id INT REFERENCES topics(id),
  userTopics_id INT REFERENCES user_topics(id)
);
