# Backend - Credit Application Platform

## Overview

The backend of the Credit Application Platform handles all server-side operations, including user authentication, loan management, and API endpoints. This section provides an overview of the backend architecture, technologies used, and setup instructions.

## Technologies Used

- **Spring Boot 3**: A powerful framework for building Java-based applications.
- **Spring Security 6**: Provides authentication and authorization mechanisms for securing the application.
- **JWT Token Authentication**: Ensures secure communication between the client and server.
- **Spring Data JPA**: Simplifies data access and persistence using the Java Persistence API.
- **JSR-303 and Spring Validation**: Enables validation of objects based on annotations.
- **OpenAPI and Swagger UI Documentation**: Generates documentation for the API endpoints.
- **Docker**: Facilitates containerization of the backend application for deployment.

## Setup Instructions

To set up the backend of the Credit Application Platform, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/sami561/pfa-backend.git
   ```

2. Navigate to the credit-application-platform directory:

   ```bash
   cd credit-application-platform
   ```

3. Run the Docker Compose file to start the necessary services:

   ```bash
   docker-compose up -d
   ```

4. Install dependencies (assuming Maven is installed):

   ```bash
   mvn clean install
   ```

5. Run the application. Replace the `x.x.x` with the current version from the `pom.xml` file:

   ```bash
   java -jar target/credit-application-platform-x.x.x.jar
   ```

6. Access the API documentation using Swagger UI:

   Open a web browser and go to `http://localhost:8080/swagger-ui/index.html`.

## License

This project is licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file for details.

## Contributors

- [Sami Ayachi](https://github.com/sami561)
- [Credit Application Platform backend ](https://github.com/sami561/pfa-backend.git)
