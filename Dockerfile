FROM node:8.6.0

COPY . /instagram-app
RUN cd /instagram-app && npm install

EXPOSE 3000

WORKDIR /instagram-app

CMD [ "node", "index.js" ]
