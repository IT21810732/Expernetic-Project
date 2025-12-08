# Expernetic Library
A full-stack library management system built with **ASP.NET Core Web API** (backend)
and **React + TypeScript** (frontend) featuring JWT-based authentication. Users can
register, login, view books, and perform CRUD operations on books after authentication.
---
## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [Authentication](#authentication)

---
## Features
- User registration and login with **JWT authentication**
- Password hashing using **PasswordHasher**
- Protected routes for creating, updating, and deleting books
- View list of books and book details
- Responsive and interactive frontend with **React** and **Tailwind CSS**
- Modal-based book detail view
- Delete confirmation modal
- Navigation bar with conditional rendering for authenticated users
---
## Tech Stack
**Backend:**
- .NET 8 / C#
- ASP.NET Core Web API
- Entity Framework Core
- SQLite Database
- JWT Authentication
**Frontend:**
- React (with TypeScript)
- Axios for API calls
- Tailwind CSS
---
## Getting Started
### Backend Setup
1. **Install .NET 8 SDK**:
2. **Navigate to the backend folder:**
 ```bash
 cd backend
 ```
3. **Install dependencies and restore packages:**
 ```bash
 dotnet restore
 ```
4. **Apply migrations:**
 ```bash
 dotnet ef migrations add InitialCreate
 dotnet ef database update
 ```
5. **Run the backend server:**
 ```bash
 dotnet run
 ```
 The backend will run on `http://localhost:5146`.
---
### Frontend Setup
1. **Navigate to the frontend folder:**
 ```bash
 cd frontend
 ```
2. **Install dependencies:**
 ```bash
 npm install
 ```
3. **Run the frontend development server:**
 ```bash
 npm run dev
 ```
 The frontend will run on `http://localhost:5173`.
---
## Usage
1. **Register a new user** or login with existing credentials.
2. **View books** on the homepage.
3. **Add a new book** using the "Add Book" page (requires login).
4. **Edit or delete books** (requires login). Delete operations show a confirmation
modal.
5. **Logout** using the logout button in the navbar.
---
## Authentication
- JWT tokens are stored in **localStorage**.
- Private routes are protected using **React Context** and `PrivateRoute` component.
- Backend routes for creating, updating, and deleting books are protected with
`[Authorize]`.
