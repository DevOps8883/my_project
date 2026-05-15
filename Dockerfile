FROM nginx:alpine

#This deletes the default nginx message
RUN rm -rf /usr/share/nginx/html/*

# Copy the contents inside your local html folder to the server root
COPY html/ /usr/share/nginx/html/

#This copies all website contents [html, css, js and other assets like images] into nginx directory
COPY css/ /usr/share/nginx/html/css/
COPY js/ /usr/share/nginx/html/js/
COPY images/ /usr/share/nginx/html/images/

EXPOSE 80
