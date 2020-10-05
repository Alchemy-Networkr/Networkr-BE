DROP TABLE IF EXISTS portfolio_projects, curriculum_projects, portfolio_comments, curriculum_comments;

CREATE TABLE portfolio_projects (
  portfolio_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title TEXT NOT NULL,
  primary_language TEXT NOT NULL,
  "date" DATE NOT NULL,
  github_link TEXT NOT NULL,
  "description" TEXT NOT NULL,
  collaborators TEXT[],
  "open" BOOLEAN NOT NULL
);

CREATE TABLE portfolio_comments (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email TEXT NOT NULL,
  comment TEXT NOT NULL,
  portfolio_id BIGINT NOT NULL
);

CREATE TABLE curriculum_projects (
  curriculum_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title TEXT NOT NULL,
  github_link TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "group" TEXT[] NOT NULL,
  cohort TEXT NOT NULL,
  tags TEXT[] NOT NULL, 
  deployed_back_end TEXT,
  deployed_front_end TEXT
);

CREATE TABLE curriculum_comments (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email TEXT NOT NULL,
  comment TEXT NOT NULL,
  curriculum_id BIGINT NOT NULL
);
