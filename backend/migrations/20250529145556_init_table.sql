-- +goose Up
-- +goose StatementBegin

-- Таблица пользователей (менеджеры, технические специалисты)
CREATE TABLE users (
       id SERIAL PRIMARY KEY,
       name TEXT NOT NULL,
       role TEXT NOT NULL, -- 'manager' или 'tech'
       email TEXT UNIQUE NOT NULL
);

-- Таблица заявок
CREATE TABLE requests (
      id SERIAL PRIMARY KEY,
      client_name TEXT NOT NULL,
      client_email TEXT NOT NULL,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'new', -- new, in_progress, completed
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
);

-- Таблица отчётов технических специалистов
CREATE TABLE tech_reports (
      id SERIAL PRIMARY KEY,
      request_id INTEGER REFERENCES requests(id) ON DELETE CASCADE,
      tech_user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
      report TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
);

-- Таблица комментариев (для диалога)
CREATE TABLE comments (
      id SERIAL PRIMARY KEY,
      request_id INTEGER REFERENCES requests(id) ON DELETE CASCADE,
      user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
      content TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
);

-- Таблица команды проекта (для завершённых заявок)
CREATE TABLE project_teams (
       id SERIAL PRIMARY KEY,
       request_id INTEGER REFERENCES requests(id) ON DELETE CASCADE,
       team_description TEXT NOT NULL,
       technologies TEXT NOT NULL,
       notes TEXT,
       status TEXT NOT NULL DEFAULT 'planned', -- planned, in_progress, completed, on_hold
       due_date DATE -- дедлайн для контроля сроков
);


-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE IF EXISTS project_teams;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS tech_reports;
DROP TABLE IF EXISTS requests;
DROP TABLE IF EXISTS users;

-- +goose StatementEnd
