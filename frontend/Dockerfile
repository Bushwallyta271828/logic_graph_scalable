# Use the official NGINX image as a parent image
FROM nginx:alpine

# Remove the default nginx.html file
RUN rm /usr/share/nginx/html/*

# Copy the build output of your React app into the container
COPY --from=build /app/build /usr/share/nginx/html

# Optional: If you have a custom nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 to the Docker host, so we can access it from the outside.
EXPOSE 80
