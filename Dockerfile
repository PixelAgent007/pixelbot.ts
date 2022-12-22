FROM node:16-alpine

WORKDIR /app

COPY ./package.json /app/package.json

# Move build files
COPY ./ /app/

# Install git
RUN apk add --no-cache git

# Install dependencies
RUN npm install

# Start bot
CMD [ "npm", "run", "start" ]
