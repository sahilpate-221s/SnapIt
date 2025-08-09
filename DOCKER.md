# Docker Setup Guide for SnapIt

This guide will help you dockerize and run the SnapIt application using Docker and Docker Compose.

## Prerequisites

- Docker installed on your system
- Docker Compose installed
- Node.js 18+ (for development)

## Quick Start

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd snapit
```

### 2. Create environment file
```bash
cp .env.example .env
```

### 3. Edit the .env file with your configuration
Update the following variables in `.env`:
- `MONGODB_URI`
- `JWT_SECRET`
- `CLOUDINARY_*` variables
- Any other API keys

### 4. Build and run with Docker Compose
```bash
# Build and start all services
docker-compose up --build

# Or run in detached mode
docker-compose up -d --build
```

### 5. Access the application
- Frontend: http://localhost:3000
- Backend API: http://localhost:4000
- MongoDB: localhost:27017

## Available Commands

```bash
# Start all services
docker-compose up

# Stop all services
docker-compose down

# Rebuild and start
docker-compose up --build

# View logs
docker-compose logs

# View specific service logs
docker-compose logs backend
docker-compose logs frontend

# Stop and remove containers
docker-compose down -v

# Access backend container
docker-compose exec backend sh

# Access frontend container
docker-compose exec frontend sh
```

## Development Mode

For development with hot-reload:

```bash
# Backend only
docker-compose up backend mongo

# Frontend only (with Vite dev server)
cd frontend
npm install
npm run dev
```

## Production Deployment

For production deployment:

```bash
# Build for production
docker-compose -f docker-compose.yml up -d --build

# Scale services
docker-compose up -d --scale backend=3
```

## Troubleshooting

### Common Issues

1. **Port conflicts**: Ensure ports 3000, 4000, and 27017 are available
2. **MongoDB connection**: Check MongoDB container logs
3. **Build failures**: Check Docker logs for specific errors

### View logs
```bash
docker-compose logs -f
```

### Reset everything
```bash
docker-compose down -v
docker-compose up --build
```

## Architecture

- **Backend**: Node.js Express API running on port 4000
- **Frontend**: React Vite app served by Nginx on port 3000
- **Database**: MongoDB running on port 27017
- **Reverse Proxy**: Nginx for frontend routing

## Security Notes

- Never commit `.env` file to version control
- Use strong JWT secrets
- Configure proper CORS settings
- Use HTTPS in production
