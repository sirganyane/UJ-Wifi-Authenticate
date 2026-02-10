FROM nginx:stable-alpine

# Clean default files
RUN rm -rf /usr/share/nginx/html/*

# Copy all source files to the Nginx web root
COPY src/admin.html /usr/share/nginx/html/admin.html
COPY src/index.html /usr/share/nginx/html/index.html
COPY src/portal.html /usr/share/nginx/html/portal.html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]