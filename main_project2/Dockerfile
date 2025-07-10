# use an official node.js runtime as a parent image
FROM node:24.2.0

# set the working directory in the container
WORKDIR /app

# copy the package.json and package-lock.json files to the working directory
COPY package*.json .

# install the dependencies
RUN npm install

# copy the rest of the application code to the working directory
COPY . .

# expose the port the app runs on
EXPOSE 5003

# start the application
CMD ["node", "./src/server.js"]