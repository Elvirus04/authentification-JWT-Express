# Authentication System with Node, Express, and PostgreSQL

A simple authentication system built with Node.js, Express, and PostgreSQL. This system includes user registration, login with JWT, and protected project routes.

## Features

- User registration with password hashing
- User login with JWT token generation
- JWT-based authentication middleware
- Protected project routes
- PostgreSQL database integration

## Getting Started

### Prerequisites

- Node.js
- PostgreSQL

### Installation

1. Clone the repository
2. Install dependencies
   ```
   npm install
   ```
3. Create a PostgreSQL database
4. Configure environment variables in `.env` file
5. Start the server
   ```
   npm run dev
   ```

## API Endpoints

### Authentication

- **POST /api/auth/register** - Register a new user
  ```
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```

- **POST /api/auth/login** - Login a user
  ```
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

- **GET /api/auth/me** - Get current user profile (protected)

### Projects (Protected Routes)

- **GET /api/projects** - Get all projects for authenticated user
- **GET /api/projects/:id** - Get a single project
- **POST /api/projects** - Create a new project
  ```
  {
    "title": "Project Title",
    "description": "Project Description"
  }
  ```
- **PUT /api/projects/:id** - Update a project
  ```
  {
    "title": "Updated Title",
    "description": "Updated Description"
  }
  ```
- **DELETE /api/projects/:id** - Delete a project

## Authentication

All project routes are protected and require a valid JWT token. Include the token in the Authorization header:

```
Authorization: Bearer <your_token>
```# authentification-JWT-Express
