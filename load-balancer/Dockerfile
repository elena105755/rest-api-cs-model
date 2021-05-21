FROM node:10-alpine

#create server directory
WORKDIR /src

#install server dependencies
#wildcard used to ensure both js packages are copied where available
COPY ./src/package.json /src
COPY ./src /src

RUN npm install

EXPOSE 9090
CMD ["node", "loadBalancer.js"]