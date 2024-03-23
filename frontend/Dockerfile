# Use the official Node.js image as the base
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the entire project to the working directory
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the port on which the application will run (default is 3000)
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]
