FROM nginx:stable-alpine

# Remove default Nginx welcome page
RUN rm -rf /usr/share/nginx/html/*

# Copy your source files into the container
COPY src/index.html /usr/share/nginx/html/index.html
COPY src/admin.html /usr/share/nginx/html/admin.html
COPY src/portal.html /usr/share/nginx/html/portal.html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]