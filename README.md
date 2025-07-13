# CGP Systems Test

## Description

This project consists of a backend (Node.js + Express + Sequelize + Typescript) and a frontend (React + Vite + Typescript).
Functionality includes:

- viewing a list of users with the number of their images,
- pagination,
- sorting by the number of images,
- creating new users with the ability to upload an image.

---

## Requirements

- Node.js **v20.17.0**
- npm
- PostgreSQL

---

## Installation & Setup

1. **Clone the repository** and navigate to the project folder.

2. **Install backend dependencies:**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies:**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Setup the database and seed initial data:**
    - Go to the backend folder and run the setup script:
      ```bash
      cd ../backend
      npm run setup
      ```
    - This will initialize the database and seed it with mock data.

5. **Start the backend server:**
   ```bash
   npm run dev
   ```

6. **Start the frontend development server:**
   ```bash
   cd ../frontend
   npm run dev
   ```

---

Now you can access the application in your browser and interact with the API.
