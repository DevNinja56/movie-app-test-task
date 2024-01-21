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
