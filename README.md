# Basic Inventory Management System


## Overview

This project is a Basic Inventory Management System built using Django for the backend, React for the frontend, and PostgreSQL for the database. The entire application is dockerized for easy deployment and management.

## Features

- **Inventory Management**: Manage products, sales, and stock levels.
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
    git clone https://github.com/linkjavier/basic-inventory-system.git
    cd basic-inventory-system
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

  **Execute SQL Commands**

    -create-tables.sql
    -create-procedures.sql

    This SQL Scripts create the structure of the database

4. **Apply Migrations**

    Once the containers are up and running and SQL Scripts executed, open a new terminal window and run:

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
│   ├── inventory_project
│   ├── inventory
│   └── requirements.txt
├── frontend
│   ├── Dockerfile
│   ├── public
│   ├── src
│   ├── package.json
│   └── tailwind.config.js (Future)
├── .env
├── docker-compose.yml
└── README.md
└── create-procedures.sql
└── create-tables.sql
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

# Contributing

If you'd like to contribute to this project, please follow these steps:

1. **Fork the repository.**
2. **Create a feature branch:**

    ```bash
    git checkout -b feature/your-feature
    ```

3. **Commit your changes:**

    ```bash
    git commit -am 'Add some feature'
    ```

4. **Push to the branch:**

    ```bash
    git push origin feature/your-feature
    ```

5. **Create a new Pull Request.**

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React](https://reactjs.org/).
- [django](https://www.djangoproject.com/).
- [Docker Compose](https://docs.docker.com/compose/).
- [Tailwind CSS](https://tailwindcss.com/).
---

Made with 💙 by [Javier Charria Gómez](https://github.com/linkjavier)
