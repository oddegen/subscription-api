# Subscription API

## Overview

The Subscription API is a robust service designed to manage user subscriptions. This API handles functionalities such as user authentication and subscription management. It is implemented using modern web development practices to ensure scalability and security.

## Features

- **User Authentication**

  - Secure authentication using bcrypt for password hashing.
  - Token-based authentication with JSON Web Tokens (JWT).

- **Subscription Management**

  - Endpoints for creating, updating, and deleting subscription plans.
  - Management of user subscriptions.

- **Database Integration**

  - MongoDB for data storage.
  - Mongoose for object data modeling.

- **Environment Configuration**
  - Environment variables managed using dotenv.

## Technologies Used

- **Languages**

  - TypeScript
  - JavaScript

- **Backend Framework**

  - Express

- **Database**

  - MongoDB
  - Mongoose

- **Authentication and Security**

  - bcryptjs
  - jsonwebtoken

- **Environment Configuration**

  - dotenv

- **Development Tools**
  - TypeScript
  - Nodemon
  - ESLint

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/oddegen/subscription-api.git
   ```

2. Navigate to the project directory:

   ```sh
   cd subscription-api
   ```

3. Install the dependencies:

   ```sh
   npm install
   ```

4. Set up environment variables by creating a `.env` file in the root directory and adding the necessary configurations.

## Usage

- Start the server in development mode:

  ```sh
  npm run dev
  ```

- Build the project:

  ```sh
  npm run build
  ```

- Start the server in production mode:

  ```sh
  npm start
  ```

- Type-check the code:
  ```sh
  npm run type-check
  ```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License

This project is licensed under the MIT License.
