✅ **Клиент** — доступ только к своей заявке (через e-mail).    
✅ **Менеджеры** — доступ ко всем эндпоинтам (заявки, отчёты, назначение тех. специалистов и т.д.).

Ниже — финальный список API-эндпоинтов с учётом разграничений доступа:

---

## 📌 Финальный список API:

---

### (+) **POST /login**

* **Для:** Менеджеров (и/или тех. специалистов).
* **Описание:** Авторизация пользователя.
* **Принимает:**

  ```json
  {
    "email": "manager@example.com",
    "password": "password123"
  }
  ```
* **Возвращает:**

  ```json
  {
    "token": "jwt-token",
    "user": {
      "id": 2,
      "name": "Алексей",
      "role": "manager"
    }
  }
  ```

---

### (+) **POST /requests.**

* **Для:** Клиентов.
* **Описание:** Создаёт новую заявку.
* **Принимает:**

  ```json
  {
    "client_name": "Иван Иванов",
    "client_email": "ivan@example.com",
    "title": "Разработка CRM",
    "description": "Нужно разработать CRM систему для отдела продаж."
  }
  ```
* **Возвращает:**

  ```json
  {
    "id": 1,
    "status": "new"
  }
  ```

---

### (+) **GET /requests?status=...** 

* **Для:** Менеджеров.
* **Описание:** Получить список всех заявок.
* **Параметры:**

    * `status` — фильтр (может быть пустым) по статусу ("", "new", "new, "in_progress", "completed").
* **Возвращает:**

  ```json
  {
  "requests": [
    {"id": 1, "client_name": "...", "title": "...", "status": "new"},
    {"id": 2, "client_name": "...", "title": "...", "status": "in_progress"}
  ]
  }
  ```

---

### (+) **GET /requests/{id}**

* **Для:**

    * **Менеджеров** — доступ ко всем заявкам.
    * **Клиентов** — доступ только к своей заявке (через email-проверку).
* **Описание:** Получить подробности заявки.
* **Возвращает:**

  ```json
  {
    "id": 1,
    "client_name": "...",
    "description": "...",
    "status": "...",
    "comments": [...]
  }
  ```

---

### 👨‍💻 **POST /requests/{id}/assign-tech**

* **Для:** Менеджеров.
* **Описание:** Назначает технического специалиста на заявку.
* **Принимает:**

  ```json
  {
    "tech_user_id": 5
  }
  ```
* **Возвращает:** `{ "success": true }`

---

### 📝 **POST /tech-reports**

* **Для:** Тех. специалистов.
* **Описание:** Создаёт технический отчёт для заявки.
* **Принимает:**

  ```json
  {
    "request_id": 1,
    "report": "Оценка сроков: 3 месяца."
  }
  ```
* **Возвращает:** `{ "id": 1, "created_at": "..." }`

---

### 🔄 **PATCH /requests/{id}**

* **Для:** Менеджеров.
* **Описание:** Обновляет статус заявки или публикует заметку для клиента.
* **Принимает:**

  ```json
  {
    "status": "in_progress",
    "public_note": "Взято в работу"
  }
  ```
* **Возвращает:** `{ "success": true }`

---

### 💬 **POST /comments**

* **Для:** Менеджеров (и, если нужно, для клиентов через авторизацию).
* **Описание:** Добавляет комментарий к заявке.
* **Принимает:**

  ```json
  {
    "request_id": 1,
    "user_id": 2,
    "content": "Мы начали работу."
  }
  ```
* **Возвращает:** `{ "id": 1, "created_at": "..." }`

---

### 👥 **GET /users**

* **Для:** Менеджеров.
* **Описание:** Получить список пользователей (тех. специалистов).
* **Возвращает:**

  ```json
  [
    {"id": 2, "name": "Алексей", "role": "tech"}
  ]
  ```


### ⚡️ Дополнение к API:

Метод	Путь	Роль	Назначение
POST /api/requests/{id}/project_team	менеджер	Добавить финальную информацию о команде и стек
GET /api/requests/{id}/project_team

---

## ✨ Пояснения по доступу:

* 🔑 **JWT-токен** — при логине (для менеджеров и техников).
* 📧 **Клиенты** могут работать только с `POST /requests` (создание заявки) и `GET /requests/{id}` (просмотр своей заявки).

    * Проверка через `client_email` в заявке или дополнительный секретный токен, если есть время.
* 👨‍💼 **Менеджеры** имеют полный доступ ко всем эндпоинтам.
* 👨‍🔧 **Тех. специалисты** могут:

    * `POST /tech-reports` — добавлять отчёты.
    * (опционально) могут читать заявки, если нужно.

---

Если хочешь, могу ещё расписать какие middleware или проверку ролей использовать в Go! 😉
