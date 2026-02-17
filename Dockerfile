FROM node:20-slim

WORKDIR /app

# Copy package files and install
COPY package.json ./
RUN npm install --omit=dev

# Copy the rest
COPY . .

ENV PORT=8080
EXPOSE 8080

CMD ["node", "src/server.js"]
