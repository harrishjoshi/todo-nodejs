# Use the official Node.js 13-alpine image as the base image
FROM node:13-alpine

# Set environment variables for the MongoDB username and password
ENV MONGO_DB_USERNAME=username \
    MONGO_DB_PWD=password

# Create a directory to store the application code
RUN mkdir -p /home/app

# Copy the contents of the current directory on the host into the /home/app directory in the Docker image
COPY ./app /home/app

# set default dir so that next commands executes in /home/app dir
WORKDIR /home/app

# Install the dependencies listed in the package.json file for the application
# will execute npm install in /home/app because of WORKDIR
RUN npm install

# Specify the command to run when the container is started
CMD ["node", "index.js"]