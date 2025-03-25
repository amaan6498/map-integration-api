# Map Integration API

This is a Node.js backend API for a map integration project. It provides authentication, dashboard data, and a default map location using Express, JWT authentication, and CORS handling.

## Features

- User authentication with JWT
- Secure API routes
- CORS configuration for frontend integration
- Dashboard API with sample data
- Map API returning default location (India)

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Installation

### 1. Clone the Repository

```sh
git clone https://github.com/amaan6498/map-integration-api.git
```

### 2. Install Dependencies

```sh
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory and add the following:

```env
PORT=3000
JWT_SECRET=your_secret_key_here
```

Replace `your_secret_key_here` with a strong secret key for JWT authentication.

## Running the Server

### 1. Start the Server

```sh
node index.js
```

OR for development with auto-restart on changes:

```sh
npm run dev
```

### 2. API Endpoints

| Method | Endpoint         | Description                                        |
| ------ | ---------------- | -------------------------------------------------- |
| POST   | `/api/login`     | Authenticate user and return JWT token             |
| GET    | `/api/dashboard` | Retrieve dashboard data (requires authentication)  |
| GET    | `/api/map`       | Get default map location (requires authentication) |

## Authentication

- Use the `/api/login` endpoint to obtain a JWT token.
- Use default password {username: admin, password: admin}
- Include the token in the `Authorization` header as `Bearer <token>` when making authenticated requests.

## CORS Configuration

The server allows requests from:

```
http://localhost:3000
```

Modify `cors()` settings in `server.js` to adjust allowed origins.

## Deployment

To deploy on platforms like **Render, Vercel, or Heroku**, configure the environment variables accordingly and use:

```sh
npm run start
```
