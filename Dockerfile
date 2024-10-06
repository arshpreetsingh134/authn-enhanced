# Pull the image for Node version 19
FROM node:19

# Set the default woring directory
WORKDIR /usr/src/app

EXPOSE 3000

# Starting command (along with nodemon)
CMD [ "npx", "nodemon", "index.js"]

# Copy package.json and package-lock.json first for caching purposes
COPY package*.json /usr/src/app/

# Install Dependencies
RUN npm install
# RUN npm install pg

# Copies all project files from the host to the container
COPY . /usr/src/app/