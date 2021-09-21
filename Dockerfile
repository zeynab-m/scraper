FROM node:14.17.4

COPY . /code
COPY package.json ./
RUN npm install
WORKDIR /code