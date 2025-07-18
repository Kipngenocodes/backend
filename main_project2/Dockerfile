# Use the official Node.js image
FROM node:22-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json .

# Install dependencies which are necessary for building the application
RUN npm install 

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 5003

# Define the command to run the application
CMD ["node", "./src/server.js"]

