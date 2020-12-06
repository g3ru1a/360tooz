FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Boundle app source
COPY . .

EXPOSE 3000

CMD npm run build && npm run serve
