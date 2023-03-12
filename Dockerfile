FROM node:alpine as builder
WORKDIR /static
COPY ./package*.json /static/
RUN npm i
COPY ./configs /static/configs
COPY ./src  /static/src
RUN npm run build

FROM nginx:alpine
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /static/dist/ /usr/share/nginx/html
COPY ./sites /usr/share/nginx/html/sites
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
