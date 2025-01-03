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

## API Endpoints: `/api`

### User Routes: `/users`
- `POST /register`: Register a new user
    - Request body:
        ```json
        {
            "username": "username",
            "email": "email",
            "password": "password"
        }
        ```
- `POST /login`: Login a user
    - Request body:
        ```json
        {
            "email": "email",
            "password": "password"
        }
        ```
- `GET /logout`: Logout a user
    - Status code: 200 if successful or 500 if failed
    - Response body:
        ```json
        {
            "message": "Logged out" or "Error logging out"
        }
        ```
- `GET /me`: Get the current user
    - Status code: 200 if successful or 500 if failed
    - Response body:
        ```json
        {
            "user": {
                "_id": "id",
                "username": "username",
                "email": "email",
                "password_hash": "password_hash",
                "created_at": "created_at",
                "updated_at": "updated_at",
                "__v": 0
            }
        }
        ```

### Chat Routes: `/chats`
- `GET /:userId`: Get all chats of current user
    - Status code: 200
    - Response body:
        ```json
        {
            "chats": [
                {
                    "_id": "id",
                    "user_id": "user_id",
                    "created_at": "created_at",
                    "updated_at": "updated_at",
                    "__v": 0
                }
            ]
        }
        ```
- `POST /`: Create a new chat
    - Request body:
        ```json
        {
            "user_id": "user_id"
        }
        ```
- `PATCH /:id`: Update chat name by id
    - Request body:
        ```json
        {
            "chat_name": "chat_name"
        }
        ```
- `DELETE /:id`: Delete a chat by id

### Chat History Routes: `/chatHistories`
- `GET /:chatId`: Get all chats' messages by chat id
    - Status code: 200
    - Response body:
        ```json
        {
            "chatHistories": [
                {
                    "_id": "id",
                    "chat_id": "chat_id",
                    "model_id": "model_id",
                    "message": "message",
                    "response": "response",
                    "created_at": "created_at",
                    "__v": 0
                }
            ]
        }
        ```
- `POST /`: Create a new chat history
    - Request body:
        ```json
        {
            "chat_id": "chat_id",
            "model_id": "user_id",
            "message": "message",
            "stream": true | false | null (optional)
        }
        ```
- `DELETE /:id`: Delete a chat history by id

### Model Routes: `/models`
- `GET /`: Get all models
    - Status code: 200
    - Response body:
        ```json
        {
            "models": [
                {
                    "_id": "id",
                    "model_name": "model_name",
                    "service": "service",
                    "input_limit": "input_limit",
                    "output_limit": "output_limit",
                    "best_for": "best_for",
                    "use_case": "use_case",
                    "knowledge_cutoff": "knowledge_cutoff",
                    "rate_limit": "rate_limit",
                    "__v": 0
                }
            ]
        }
        ```
- `POST /`: Create a new model
    - Request body:
        ```json
        {
            "model_name": "model_name",
            "service": "service",
            "input_limit": "input_limit",
            "output_limit": "output_limit",
            "best_for": "best_for",
            "use_case": "use_case",
            "knowledge_cutoff": "knowledge_cutoff",
            "rate_limit": "rate_limit"
        }
        ```
- `PATCH /:id`: Update a model by id
- `DELETE /:id`: Delete a model by id