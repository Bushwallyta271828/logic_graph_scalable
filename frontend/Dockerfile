# Use a Node image to install 'serve' and serve the static files
FROM node:14 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:14-alpine
WORKDIR /app
COPY --from=build /app/dist/my-angular-app .
RUN npm install -g serve
CMD ["serve", "-s", "."]
