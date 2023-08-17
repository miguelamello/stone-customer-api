# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set non-root user
USER node

# Create app directory
RUN mkdir -p /home/node/app/node_modules 
RUN chown -R node:node /home/node/app

# Set the working directory in the container
WORKDIR /home/node/app

# Set environment variables
ENV NODE_ENV=production

# Copy package.json and package-lock.json to the container
COPY --chown=node:node package*.json ./

# Install app dependencies
RUN npm install
RUN npm prune --production

# Copy the rest of the application code
COPY --chown=node:node . . 

# Expose the port your app will run on
EXPOSE 3030	

# Command to run your NestJS app
CMD npm run start:prod
