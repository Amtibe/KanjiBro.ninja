# https://hub.docker.com/_/nginx

FROM nginx:alpine

COPY index.html /usr/share/nginx/html/index.html
COPY css /usr/share/nginx/html/css
COPY js /usr/share/nginx/html/js
COPY img /usr/share/nginx/html/img
COPY favicon-16x16.png /usr/share/nginx/html/favicon-16x16.png
COPY favicon-32x32.png /usr/share/nginx/html/favicon-32x32.png
COPY site.webmanifest /usr/share/nginx/html/site.webmanifest
