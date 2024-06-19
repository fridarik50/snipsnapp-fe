
# SnipSnapp

SnipSnapp is an online social media application for barbers and their customers built with Spring Boot, Spring Data JPA, MySQL, and React TypeScript. The application allows users to interact, see each others profile and haircut prefernces and schedule appointments.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication and authorization
- Create, update, delete, and view product posts
- Join and create private or public groups
- Image upload for user profiles and groups
- Real-time chat messaging within groups
- Responsive and interactive UI

## Installation

### Prerequisites

- Java 17 or higher
- Node.js and npm
- MySQL server

### Backend Setup

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/SnipSnapp.git
    cd SnipSnapp
    ```

2. Configure the MySQL database:
    - Update the `src/main/resources/application.properties` file with your database details:
    ```properties
    spring.datasource.url=jdbc:mysql://localhost:3306/snipsnapp
    spring.datasource.username=yourusername
    spring.datasource.password=yourpassword
    ```

3. Build and run the Spring Boot application:
    ```sh
    ./mvnw clean install
    ./mvnw spring-boot:run
    ```

### Frontend Setup

1. Navigate to the frontend directory:
    ```sh
    cd frontend
    ```

2. Install dependencies and start the development server:
    ```sh
    npm install
    npm start
    ```

## Usage

### Access the application

- Backend API: `http://localhost:8080`
- Frontend: `http://localhost:5173`

### API Endpoints

- `/api/auth/**`: Authentication endpoints
- `/api/users/**`: User management endpoints
- `/api/groups/**`: Group management endpoints
- `/api/posts/**`: Post management endpoints

Refer to the API documentation for detailed information on each endpoint.

## Project Structure

```
SnipSnapp/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── hackeru/
│   │   │   │       └── fridarik/
│   │   │   │           └── snipsnapp/
│   │   │   │               ├── config/
│   │   │   │               ├── controller/
│   │   │   │               ├── dto/
│   │   │   │               ├── model/
│   │   │   │               ├── repository/
│   │   │   │               └── service/
│   │   │   ├── resources/
│   │   │   │   └── application.properties
│   │   └── test/
│   ├── pom.xml
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.tsx
│   ├── package.json
├── README.md
└── .gitignore
```

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes. Make sure to follow the coding standards and write tests for your code.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
