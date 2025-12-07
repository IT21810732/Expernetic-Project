# Expernetic Project - Backend

## Description
This is the **backend** of the Expernetic Project, built using **ASP.NET Core 8** with **Entity Framework Core** and **SQLite** as the database.  
It provides RESTful APIs for authentication, book management, and other features required for the application.

The backend also implements **JWT authentication** for secure access to protected routes.

---

## Table of Contents
- [Technologies](#technologies)
- [Features](#features)
- [Setup](#setup)

---

## Technologies
- **ASP.NET Core**
- **Entity Framework Core**
- **SQLite**
- **JWT (JSON Web Token)** for authentication
- **C#**

---

## Features
- User registration and login
- JWT-based authentication and authorization
- CRUD operations for books
- Database migrations using EF Core
- Simple RESTful API design

---

## Setup

1. **Clone the repository**
```bash```
```git clone https://github.com/yourusername/expernetic-project.git```
```cd backend```

2. **Install Depedencies**
```dotnet restore```

3. **Update Database**
```dotnet ef database update```

4. **Run  the Application**
```dotnet run```
