FROM node:alpine as builder
WORKDIR /static
COPY ./main /static
RUN npm i
RUN npm run build

FROM nginx:alpine
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /static/dist/ /usr/share/nginx/html
COPY ./ /usr/share/nginx/html/
RUN rm -r /usr/share/nginx/html/main
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
