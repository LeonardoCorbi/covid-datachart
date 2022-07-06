FROM node:lts as dependencies
ENV NODE_ENV dependencies

WORKDIR /app

COPY package.json .
COPY yarn.lock .
RUN yarn install

COPY . .

EXPOSE 3000

CMD ["yarn", "dev"]