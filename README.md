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
                    "message": "Logged out" or "Failed to logout"
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
    - `/chats`
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
        - `GET /:id`: Get a chat by id
            - Status code: 200 if successful or 404 if not found
            - Response body:
                ```json
                {
                    "chat": {
                        "_id": "id",
                        "user_id": "user_id",
                        "created_at": "created_at",
                        "updated_at": "updated_at",
                        "__v": 0
                    }
                }
                ```
        - `POST /`: Create a new chat
            - Request body:
                ```json
                {
                    "user_id": "user_id",
                    "model_id": "model_id",
                    "message": "message"
                }
                ```
        - `DELETE /:id`: Delete a chat by id
    - `/chatHistories`
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
        - `GET /:id`: Get chat history by chat id
            - Status code: 200 if successful or 404 if not found
            - Response body:
                ```json
                {
                    "chatHistory": {
                        "_id": "id",
                        "chat_id": "chat_id",
                        "model_id": "model_id",
                        "message": "message",
                        "response": "response",
                        "created_at": "created_at",
                        "__v": 0
                    }
                }
                ```
        - `POST /`: Create a new chat history
            - Request body:
                ```json
                {
                    "chat_id": "chat_id",
                    "user_id": "user_id",
                    "message": "message"
                }
                ```
        - `DELETE /:id`: Delete a chat history by id
    - `/models`
        - `GET /`: Get all models
            - Status code: 200
            - Response body:
                ```json
                {
                    "models": [
                        {
                            "_id": "id",
                            "model_name": "model_name",
                            "description": "description",
                            "__v": 0
                        }
                    ]
                }
                ```
        - `GET /:id`: Get a model by id
            - Status code: 200 if successful or 404 if not found
            - Response body:
                ```json
                {
                    "model": {
                        "_id": "id",
                        "model_name": "model_name",
                        "description": "description",
                        "__v": 0
                    }
                }
                ```
        - `POST /`: Create a new model
            - Request body:
                ```json
                {
                    "name": "name",
                    "description": "description",
                }
                ```
        - `PATCH /:id`: Update a model by id
        - `DELETE /:id`: Delete a model by id