# Movie-App-Test-Task

## Overview

This repository contains a Docker Compose setup for the Movie-App-Test-Task, allowing you to run the Movie App locally for testing and development.

## Prerequisites

Ensure you have Docker and Docker Compose installed on your system.

- [Get Docker](https://docs.docker.com/get-docker/)
- [Install Docker Compose](https://docs.docker.com/compose/install/)

## Usage

Clone this repository:

```bash
git clone https://github.com/YOUR-USERNAME/Movie-App-Test-Task.git
```

Navigate to the project directory:

```bash
cd movie-App-Test-Task
```

Create Docker Network:

```bash
docker network create my_network
```

Build and run the Docker containers:

```bash
docker-compose up -d
```

Access the Movie App in your browser at http://localhost:4000, where 4000 is the port number specified in Dockerfile or .ENV file or docker-compose.yml.

To stop the services:

```bash
docker-compose down
```

## Application Details

The Movie App incorporates various features and technologies:

- **Express Framework with TypeScript**: Empowers robust server-side development with a typed approach.
- **MongoDB**: Utilized for efficient database storage.
- **JWT Authentication**: Ensures secure user authentication.
- **Middleware**: Handles common functionalities seamlessly.
- **Modules**:
  - **Authentication Module**: Manages user authentication.
  - **User Module**: Provides functionalities related to users.
  - **Favorite List Module**: Enables users to manage their favorite movies.
  - **Movie Module**: Harnesses the power of 3rd-party Rapid APIs for data retrieval.

## 3rd Party Rapid APIs

The Movie App leverages the following Rapid APIs:

1. **Movies-Verse API**:

   - **Get All Movies Endpoint**: Used to fetch a list of movies.
   - API Link: [Movies-Verse API](https://moviesverse1.p.rapidapi.com/movies)

2. **IMDB APIs**:
   - **Search Movie Endpoint**: Used for searching movies.
     - API Link: [IMDB Search API](https://imdb146.p.rapidapi.com/v1/find)
   - **Get Movie Detail Endpoint**: Retrieves detailed information about a specific movie.
     - API Link: [IMDB Movie Detail API](https://imdb146.p.rapidapi.com/v1/title)

## Postman Collection

Explore the Movie App API endpoints using the Postman Collection:
[Postman Collection](https://elements.getpostman.com/redirect?entityId=18274123-28c5f4bd-4aa4-4fc8-81ad-bb5af194c9e9&entityType=collection)
