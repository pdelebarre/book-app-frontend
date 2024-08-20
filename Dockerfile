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

RUN npm run build

# Use nginx to serve the React app
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

#shell to be able to catch variables at docker run time
#https://dev.to/sanjayttg/dynamic-environment-variables-for-dockerized-react-apps-5bc5
COPY env.sh /docker-entrypoint.d/env.sh
RUN chmod +x /docker-entrypoint.d/env.sh

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
