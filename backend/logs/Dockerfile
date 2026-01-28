FROM node:18-slim

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install --production

# Copy source code and UI files
COPY . .

# Expose Port 3000 for the Portal
EXPOSE 3000

CMD [ "node", "server.js" ]