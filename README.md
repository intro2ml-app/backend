# USGPT - Backend part

## Overview
This is the backend part of the USGPT project, providing the RESTful API for the frontend part.

## Installation
1. Clone the repository
2. Install the dependencies
```bash
npm install
```
3. Create a `config.env` file in the root directory and add the following environment variables:
```
ATLAS_URI=your_mongodb_uri
PORT=5000
SESSION_SECRET=your_session_secret
```
4. Start the server
```bash
npm start
```

## API Endpoints
- `/api`
    - `/users`
        - `POST /register`: Register a new user
        - `POST /login`: Login a user
        - `POST /logout`: Logout a user
        - `GET /me`: Get the current user
    - `/chats`
        - `GET /`: Get all chats
        - `GET /:id`: Get a chat by id
        - `POST /`: Create a new chat
        - `DELETE /:id`: Delete a chat by id
    - `/chatHistories`
        - `GET /`: Get all chats
        - `GET /:id`: Get chat history by chat id
        - `DELETE /:id`: Delete a chat history by id
    - `/models`
        - `GET /`: Get all models
        - `GET /:id`: Get a model by id
        - `POST /`: Create a new model
        - `PATCH /:id`: Update a model by id
        - `DELETE /:id`: Delete a model by id