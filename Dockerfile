FROM nginx:alpine

#This deletes the default nginx message
RUN rm -rf /usr/share/nginx/html/*

#This copies all my  website into nginx directory
COPY . /usr/share/nginx/html
