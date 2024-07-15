# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the application
RUN npm run build

# Use a lightweight web server to serve the build files
FROM nginx:1.23-alpine
COPY --from=0 /app/build /usr/share/nginx/html

# Expose the port the app runs on
EXPOSE 3000

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
