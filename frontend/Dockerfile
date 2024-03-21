# Build stage for React app
FROM node:alpine as build
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . ./
RUN yarn build

# NGINX stage to serve React static files
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
