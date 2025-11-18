FROM node:18-alpine

WORKDIR /app

# Install dependencies first
COPY package*.json ./
RUN npm install

# Copy everything
COPY . .

# Expose default React dev port
EXPOSE 3000

# Start React dev server
CMD ["npm", "start"]
