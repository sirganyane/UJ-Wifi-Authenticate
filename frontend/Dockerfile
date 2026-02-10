FROM nginx:stable-alpine

# Remove default Nginx page
RUN rm -rf /usr/share/nginx/html/*

# Copy everything. If your files are in a 'templates' folder, 
# we move them to the root so http://localhost:3000 works immediately.
COPY . /usr/share/nginx/html/

# Optional: If you want localhost:3000 to automatically open templates/index.html
RUN ln -s /usr/share/nginx/html/templates/index.html /usr/share/nginx/html/index.html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]