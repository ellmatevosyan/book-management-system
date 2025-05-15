#Use a multi-stage build to reduce the image size
# Stage 1: Build the application
# Start by specifying the base image
FROM node:latest as builder

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json and package-lock.json are copied
# where available
COPY package*.json ./

# Install all node modules
RUN npm install

# Bundle app source
COPY . .

# Build the project
RUN npm run build


# Stage 2: Setup the production environment
FROM node:alpine

WORKDIR /usr/src/app


COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules

#Your app binds to port 3000 so use the EXPOSE instruction
EXPOSE 3000


CMD [ "node", "dist/main" ]

# CMD [ "npm", "run", "start:dev" ]