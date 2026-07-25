version: '3.8'

services:
  backend:
    image: ${DOCKER_USERNAME}/ecommerce-backend:latest
    container_name: ecommerce-backend
    restart: always
    ports:
      - "4000:4000"
    environment:
      - PORT=4000
      - MONGODB_URI=${MONGODB_URI}
      - JWT_SECRET=${JWT_SECRET}
      - CLOUDINARY_NAME=${CLOUDINARY_NAME}
      - CLOUDINARY_API_KEY=${CLOUDINARY_API_KEY}
      - CLOUDINARY_SECRET_KEY=${CLOUDINARY_SECRET_KEY}
      - ADMIN_EMAIL=${ADMIN_EMAIL}
      - ADMIN_PASSWORD=${ADMIN_PASSWORD}
    networks:
      - ecommerce-network
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:4000/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  client:
    image: ${DOCKER_USERNAME}/ecommerce-client:latest
    container_name: ecommerce-client
    restart: always
    ports:
      - "3000:80"
    environment:
      - VITE_API_URL=${VITE_API_URL}
    depends_on:
      - backend
    networks:
      - ecommerce-network

  admin:
    image: ${DOCKER_USERNAME}/ecommerce-admin:latest
    container_name: ecommerce-admin
    restart: always
    ports:
      - "3001:80"
    environment:
      - VITE_API_URL=${VITE_ADMIN_API_URL}
    depends_on:
      - backend
    networks:
      - ecommerce-network

networks:
  ecommerce-network:
    driver: bridge
