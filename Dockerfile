# Use an official Node.js image as the base image
FROM node:16-alpine AS build

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package.json package-lock.json ./

# Install dependencies using npm
RUN npm install

# Copy the entire app to the container
COPY . .

# Define build arguments with default values
ARG REACT_APP_API_BASE_URL
ARG REACT_APP_API_PORT

# Ensure that environment variables are available during build
ENV REACT_APP_API_BASE_URL=${REACT_APP_API_BASE_URL}
ENV REACT_APP_API_PORT=${REACT_APP_API_PORT}

# Build the React app with the environment variables
RUN npm run build

# Use nginx to serve the React app
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
