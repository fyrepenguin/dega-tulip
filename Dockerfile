FROM node:16

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Copying source files
COPY . /app

# Installing dependencies
RUN npm install --legacy-peer-deps

# Running the app
CMD "npm" "run" "dev"