# Bike Breeze

Welcome to the Bike Breeze. This project is designed to provide a seamless and efficient platform for users to rent bikes online.

## Live URL

        https://bike-breeze.vercel.app/

## Features

- Signup
- login
- Get Profile
- Update Profile
- Create Bike (Admin Only)
- Get All Bikes
- Update Bike (Admin Only)
- Delete Bike (Admin Only)
- Create Rental
- Return Bike (Admin Only)
- Get All Rentals for User

## Installation

To set up the project locally, follow these steps

1.  Clone the Repository :

        git clone https://github.com/juixer/mission-3-assignment.git
        cd mission-3-assignment

2.  Install Dependencies:

        npm install

3.  Run the Application:

        npm run start:prod

    or

        npm run start:dev

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`NODE_ENV`
`PORT`
`DB_URL`
`BCRYPT_SALT`
`JWT_ACCESS_SECRET`
`JWT_ACCESS_EXPIRES_IN`

## Tech Stack

**Server:** Node.js, Express.js, MongoDB, Mongoose, JWT for authentication, Bcrypt for password hashing, Zod for schema validation

## Tools:

- dotenv for environment variables
- ts-node-dev for TypeScript development
- CORS for handling cross-origin requests
- Cookie-parser for managing cookies
- http-status for standard HTTP status codes
