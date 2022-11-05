FROM node:14-alpine as builder

ENV NUXT_VERSION=2.15.4

WORKDIR /app
COPY package.deps.json package.json
COPY yarn.lock .npmrc ./
RUN yarn install
COPY . .
RUN : \
  && yarn build --standalone \
  && rm -rf node_modules \
  && rm package.json \
  && yarn add "nuxt-start@${NUXT_VERSION}"

FROM node:14-alpine

WORKDIR /app
COPY --from=builder /app .
CMD ["npx", "nuxt-start"]
