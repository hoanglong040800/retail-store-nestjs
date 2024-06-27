# Build dist folder
FROM node:18-alpine as development
WORKDIR /usr/src/app
COPY package.json .
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

# Run app
FROM node:18-alpine as production
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY package.json .
RUN yarn install --immutable
COPY . .
# copy dist folder from development stage above
COPY --from=development /usr/src/app/dist ./dist 
CMD ["yarn", "start:prod"]
