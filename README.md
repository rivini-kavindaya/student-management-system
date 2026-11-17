# Student Management System

A full-stack web application for managing student and course records, built with React, Spring Boot, and MySQL.

## Overview

The Student Management System centralizes administration of student and course information. It provides secure administrator login, full CRUD operations for students and courses, search/pagination/sorting, dashboard analytics, and automated backend testing.

## Tech Stack

| Area | Technology |
|---|---|
| Frontend | React, Vite, Axios, React Router, Bootstrap, Recharts |
| Backend | Java 17, Spring Boot 3.3.5, Spring Web, Spring Data JPA |
| Security | Spring Security, JWT (jjwt), BCrypt |
| Database | MySQL |
| Testing | JUnit, Mockito, H2 (in-memory) |
| Build | Gradle |
| API Docs | Swagger / OpenAPI |

## Features

- Secure administrator login (JWT-based authentication)
- Student CRUD: add, view, edit, delete, search, paginate, sort
- Course CRUD: add, view, edit, delete
- Many-to-one Student–Course relationship with foreign key enforcement
- Safeguard against deleting a course that has enrolled students
- Dashboard with summary statistics and charts
- Authenticated admins can create additional admin accounts
- Interactive API documentation via Swagger/OpenAPI
- Automated unit tests for core backend services

## Project Structure

```
student-management-system/
├── backend/
│   ├── src/main/java/com/student/studentmanagement/
│   │   ├── config/
│   │   ├── controller/
│   │   ├── dto/
│   │   ├── entity/
│   │   ├── exception/
│   │   ├── repository/
│   │   ├── security/
│   │   └── service/
│   ├── src/main/resources/
│   ├── src/test/java/
│   ├── src/test/resources/
│   ├── build.gradle
│   ├── gradlew
│   └── gradlew.bat
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   └── utils/
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
├── .gitignore
└── README.md
```

## Prerequisites

- Java 17
- MySQL Server (MySQL Workbench optional)
- Node.js and npm
- Git

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd student-management-system
```

### 2. Set up the database

```sql
CREATE DATABASE studentdb;
```

Create the initial administrator account (admin registration is protected, so the first admin must be seeded separately).

### 3. Configure environment variables

**Backend** — set these as environment variables (do not hard-code secrets):

```properties
spring.datasource.url=${DB_URL:jdbc:mysql://localhost:3306/studentdb}
spring.datasource.username=${DB_USERNAME:root}
spring.datasource.password=${DB_PASSWORD}

spring.jpa.hibernate.ddl-auto=update
server.port=8080

jwt.secret=${JWT_SECRET}
```

**Frontend** — copy `.env.example` to `.env` inside `frontend/` and set:

```
VITE_API_URL=http://localhost:8080
```

### 4. Run the backend

```bash
cd backend
gradlew.bat bootRun
```

- Backend: http://localhost:8080
- Swagger UI: http://localhost:8080/swagger-ui/index.html

### 5. Run the frontend

```bash
cd frontend
npm install
npm run dev
```

- Frontend: http://localhost:5173

## API Overview

Key endpoints include `/login`, `/students`, `/courses`, and `/dashboard`, with role-based access (public, authenticated, or ADMIN-only) enforced via JWT.

Full interactive documentation is available via Swagger UI once the backend is running.

## Testing

Run the backend test suite:

```bash
cd backend
gradlew.bat test
```

Tests cover `StudentService`, `CourseService`, `AdminService`, and the Spring Boot application context, using an H2 in-memory database so tests run independently of the production MySQL database.

| Test Class | Tests | Coverage |
|---|---|---|
| StudentServiceTest | 5 | Save, invalid course, missing course, update, delete |
| CourseServiceTest | 2 | Safe delete and blocked delete |
| AdminServiceTest | 4 | Login success/failure, duplicate username, registration |
| StudentManagementApplicationTests | 1 | Spring Boot context loads with H2 |

## Security Notes

- Passwords are stored as BCrypt hashes; plain-text passwords are never returned by the API.
- JWT signing secret is supplied via the `JWT_SECRET` environment variable, not hard-coded.
- `/register` requires the ADMIN role; login and Swagger docs are the only public endpoints.
- The frontend uses a `ProtectedRoute` component to block unauthenticated access to admin pages.

## Current Limitations

- Administrator-focused only; no separate student or lecturer portals.
- No password reset or email verification flow.
- Configured for local development; not yet documented for cloud deployment.

## Future Improvements

- Dedicated custom exceptions (e.g. `CourseInUseException`, `ResourceNotFoundException`)
- Refresh-token support and token-expiry handling
- Password reset and account recovery
- Integration tests for controllers and security flows
- Docker configuration for local setup
- CI with GitHub Actions for backend tests and frontend builds
- Cloud deployment configuration
- Auditing fields (`createdAt`, `updatedAt`)
- Export/reporting features for students and courses

  ## Project Maintenance

This project is continuously improved to enhance
its documentation, functionality, and maintainability.

## Author

**Rivini Kavindaya** — Software Engineering Project, September 2026
