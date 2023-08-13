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
ENV REDIS_HOST=redis
ENV REDIS_PORT=6379
ENV REDIS_TTL=300
ENV SECRET_KEY='3596bece-3609-4292-9ed8-b2881fae4cda'

# Copy package.json and package-lock.json to the container
COPY --chown=node:node package*.json ./

# Install app dependencies
RUN npm install
RUN npm prune --production

# Copy the rest of the application code
COPY --chown=node:node . .

# Expose the port your app will run on
EXPOSE 3000	

# Command to run your NestJS app
CMD ["npm", "run", "start:prod"]
