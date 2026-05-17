# Voting Backend System

A backend API project built using Node.js, Express.js, MongoDB, and JWT Authentication.  
This project provides secure user authentication, role-based access, candidate management, and a voting system where users can vote for candidates.

---

## Overview

The Voting Backend System is a RESTful API designed to handle the backend functionality of an online voting platform.

It includes user registration, login, JWT-based authentication, admin-based candidate management, voting functionality, and vote count tracking.

The project was tested using Postman and uses MongoDB as the database.

---

## Features

- User signup and signin
- Secure password hashing using bcrypt
- JWT-based authentication
- Role-based access control
- Admin-only candidate management
- Add, update, and delete candidates
- Users can vote for candidates
- One user can vote only once
- Vote count tracking
- MongoDB database integration
- RESTful API structure
- Environment variable support using dotenv
- API testing using Postman

---

## Tech Stack

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### Authentication & Security
- JSON Web Token JWT
- bcrypt
- dotenv

### Development & Testing
- Nodemon
- Postman

### Version Control
- Git
- GitHub

---

## Project Structure

```text
Voting backend/
│
├── src/
│   ├── config/
│   │   ├── config.js
│   │   └── database.js
│   │
│   ├── controllers/
│   │   ├── user.controllers.js
│   │   └── candidate.controllers.js
│   │
│   ├── model/
│   │   ├── user.model.js
│   │   └── candidate.model.js
│   │
│   └── routes/
│       ├── user.routes.js
│       └── candidate.routes.js
│
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

---

## Installation and Setup

Follow these steps to run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/anshuljoshi2006/voting-backend.git
```

### 2. Navigate to the Project Folder

```bash
cd voting-backend
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Create Environment File

Create a `.env` file in the root directory and add the following variables:

```env
PORT=3000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

You can also refer to the `.env.example` file.

### 5. Start the Server

If you are using Node.js:

```bash
node server.js
```

If you are using Nodemon:

```bash
nodemon server.js
```

The server will start running on:

```text
http://localhost:3000
```

---

## API Endpoints

> Note: Endpoint paths may depend on how routes are mounted in `server.js`.

---

## User Routes

### Register User

```http
POST /user/signup
```

Registers a new user.

### Login User

```http
POST /user/signin
```

Logs in an existing user and returns a JWT token.

---

## Candidate Routes

### Get Candidate Count

```http
GET /candidate/candidateCount
```

Returns the total number of candidates.

### Add Candidate

```http
POST /candidate
```

Adds a new candidate.  
Only admin users can access this route.

### Get All Candidates

```http
GET /candidate
```

Returns the list of all candidates.

### Update Candidate

```http
PUT /candidate/:id
```

Updates candidate details.  
Only admin users can access this route.

### Delete Candidate

```http
DELETE /candidate/:id
```

Deletes a candidate.  
Only admin users can access this route.

### Vote for Candidate

```http
POST /candidate/vote/:id
```

Allows a user to vote for a candidate.

### Get Vote Count

```http
GET /candidate/vote/count
```

Returns the vote count of candidates.

---

## Authentication

This project uses JWT authentication.

After login, the server returns a token.  
For protected routes, send the token in the request headers.

Example:

```http
Authorization: Bearer your_jwt_token
```

---

## Environment Variables

The project uses environment variables to keep sensitive information secure.

Example `.env` file:

```env
PORT=3000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

The `.env` file is ignored using `.gitignore`, so it will not be uploaded to GitHub.

---

## Testing

The APIs were tested using Postman.

You can test the project by sending requests to the available endpoints after starting the server locally.

---

## Important Notes

- Admin users can manage candidates.
- Normal users can vote for candidates.
- A user should be allowed to vote only once.
- MongoDB must be connected before running the project.
- Keep your `.env` file private and never upload it to GitHub.

---

## Future Improvements

- Add frontend interface
- Add email verification
- Add password reset functionality
- Add better error handling
- Add request validation
- Add API documentation using Swagger
- Add deployment support
- Add unit and integration testing

---

## Author

**Anshul Joshi**

---

## License

This project is open-source and available for learning and development purposes.