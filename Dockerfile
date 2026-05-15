FROM nginx:alpine

#This deletes the default nginx message
RUN rm -rf /usr/share/nginx/html/*

#This copies all website contents [html, css, js and other assets like images] into nginx directory
COPY . /usr/share/nginx/html/

COPY index.html /usr/share/nginx/html/
COPY style.css /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/
EXPOSE 80
