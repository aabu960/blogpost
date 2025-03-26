# Change this line
FROM node:22 

# Set working directory inside container
WORKDIR /app 
COPY package*.json ./

# Ensure 'type: module' is present in package.json
RUN npm install

COPY . .

# Expose port
EXPOSE 5000

RUN npm install -g nodemon
CMD ["nodemon", "server.js"]

