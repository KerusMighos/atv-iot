FROM node

COPY package.json /app/package.json
WORKDIR /app
RUN npm install

COPY . .

ENTRYPOINT ["node", "index.js"]

