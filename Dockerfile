FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Boundle app source
COPY . .

ADD ./public /usr/src/app/public

EXPOSE 3000

CMD npm run build && npm run serve
