# Basic Inventory Management System


## Overview

This project is a Basic Inventory Management System built using Django for the backend, React for the frontend, and PostgreSQL for the database. The entire application is dockerized for easy deployment and management.

## Features

- **Inventory Management**: Manage products, categories, and stock levels.
- **User Authentication**: Secure login and registration system. (Future)
- **Responsive UI**: Fully responsive design with React and TailwindCSS. (Future)
- **API**: RESTful API with Django Rest Framework.
- **Dockerized**: Easily deployable using Docker Compose.
- **Database**: PostgreSQL integration with Django ORM.

## Technologies Used

- **Backend**: Django, Django Rest Framework
- **Frontend**: React, TailwindCSS
- **Database**: PostgreSQL
- **Containerization**: Docker, Docker Compose

## Prerequisites

Before running this project, ensure you have the following installed:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Installation

1. **Clone the Repository**

    ```bash
    git clone https://github.com/linkjavier/basic-inventory-management.git
    cd basic-inventory-management
    ```

2. **Create a `.env` File**

    Create a `.env` file in the root directory with the following content: (Not implemented yet)

    ```env
    SECRET_KEY=your-secret-key
    DEBUG=True
    ALLOWED_HOSTS=localhost 127.0.0.1
    DB_NAME=inventory_db
    DB_USER=inventory_user
    DB_PASSWORD=your-db-password
    DB_HOST=db
    DB_PORT=5432
    ```

3. **Build and Run the Docker Containers**

    ```bash
    docker-compose up --build
    ```

    This will start the Django backend, React frontend, and PostgreSQL database.

4. **Apply Migrations**

    Once the containers are up and running, open a new terminal window and run:

    ```bash
    docker-compose exec web python manage.py migrate
    ```

5. **Create a Superuser**

    Create an admin user to access the Django admin panel:

    ```bash
    docker-compose exec web python manage.py createsuperuser
    ```

6. **Access the Application**

    - Backend (Django API): [http://localhost:8000/api/](http://localhost:8000/api/)
    - Frontend (React App): [http://localhost:3000/](http://localhost:3000/)
    - Django Admin: [http://localhost:8000/admin/](http://localhost:8000/admin/)

## Project Structure

```plaintext
.
├── backend
│   ├── Dockerfile
│   ├── manage.py
│   ├── inventory_management
│   ├── api
│   └── requirements.txt
├── frontend
│   ├── Dockerfile
│   ├── public
│   ├── src
│   ├── package.json
│   └── tailwind.config.js
├── .env
├── docker-compose.yml
└── README.md
```

backend/: Contains the Django project and applications.
frontend/: Contains the React application.
docker-compose.yml: Docker Compose configuration to manage multi-container setup.

## Usage

- **Running the Development Environment**
- Use the following command to start the development environment:
```bash
docker compose up
```

- Stop the environment with:
```bash
docker compose down
```

## Contributing

Feel free to contribute to this project by submitting a pull request. Please ensure all tests pass and follow the coding standards outlined in the project.
