FROM nginx
COPY build /usr/share/nginx/html/reactstudy

#docker run (with port exposing to localhost 8080 for example). then access http://localhost:8080/reactstudy/