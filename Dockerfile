# Use official Node image
FROM node:18
# Create app directory
WORKDIR /app
# Install app dependencies
COPY package*.json ./
RUN npm install
# Copy app source code
COPY . .
# Expose port
EXPOSE 3000
# Start the app
CMD ["npm", "run", "dev"]
