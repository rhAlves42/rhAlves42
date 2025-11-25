FROM node:22.18.0-slim

RUN mkdir -p /app
WORKDIR /app
COPY package.json yarn.lock /app/
RUN yarn install --frozen-lockfile
COPY . /app
EXPOSE 3000

CMD ["yarn", "dev"]
