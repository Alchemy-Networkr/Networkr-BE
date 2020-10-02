DROP TABLE IF EXISTS portfolios_projects, curriculum_projects;

CREATE TABLE portfolios_projects (
  portfolio_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title TEXT NOT NULL,
  primary_language TEXT NOT NULL,
  "date" DATE NOT NULL,
  github_link TEXT NOT NULL,
  comments TEXT[],
  "description" TEXT NOT NULL,
  collaborators TEXT[],
  "open" BOOLEAN NOT NULL
);

CREATE TABLE curriculum_projects (
  curriculum_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title TEXT NOT NULL,
  github_link TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "group" TEXT[] NOT NULL,
  comments TEXT[] NOT NULL,
  cohort TEXT NOT NULL,
  tags TEXT[] NOT NULL, 
  deployed_back_end TEXT,
  deployed_front_end TEXT
);
