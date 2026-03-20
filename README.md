# Purple Cream API

A secure RESTful API for managing an Açaí shop’s inventory and staff. Built with Node.js, Express, and MongoDB Atlas, this project features robust data validation, Google OAuth 2.0 security, and automated documentation.

## Features
- **Inventory Management:** Full CRUD operations for Açaí products (bowls, smoothies, toppings).
- **Employee Records:** Secure management of staff data.
- **Admin Security:** Sensitive routes (POST/PUT/DELETE) are protected via Google OAuth 2.0.
- **Data Integrity:** Strict schema validation using Mongoose and request body validation with express-validator.
- **Auto-Documentation:** Interactive API explorer powered by Swagger UI.
- **Cloud Hosted:** Fully deployed on Render with a live MongoDB Atlas connection.

## Tech Stack
- **Backend:** Node.js & Express
- **Database:** MongoDB Atlas (Mongoose ODM)
- **Security:** Passport.js (Google OAuth 2.0 Strategy)
- **Validation:** express-validator
- **Documentation:** Swagger-jsdoc & Swagger-ui-express

## Getting Started

### 1. Prerequisites
- Node.js (v16+)
- A MongoDB Atlas Account
- Google Cloud Console credentials (for OAuth)

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/pdmoura/purple-cream-api.git

# Navigate into the project
cd purple-cream-api

# Install dependencies
npm install
```

### 3. Environment Variables
Create a .env file in the root directory and add the following:

```env
PORT=3000
MONGODB_URI=your_mongodb_atlas_connection_string
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
SESSION_SECRET=your_random_secret_string
ADMIN_EMAIL=your-email@gmail.com

``` 

### 4. Database Seeding
To quickly populate your database with initial Açaí products and employees:

```bash
node seed.js
```

## API Documentation
Once the server is running, visit the interactive Swagger documentation at:
http://localhost:3000/api-docs

## Deployment
This project is configured for one-click deployment on Render. Ensure that all environment variables listed above are added to the Environment section in your Render dashboard.

## Validation Demo

To test validation, try sending a `POST` request to `/api/products` with a negative price. The API will return a `400 Bad Request` with a detailed error message from express-validator:

```json
{
  "errors": [
    {
      "type": "field",
      "msg": "Price must be a positive number",
      "path": "price",
      "location": "body"
    }
  ]
}
```