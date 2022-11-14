# stage1 as builder
FROM node:14-alpine as builder

WORKDIR /vue-ui

# Copy the files and install dependencies
COPY . .
RUN yarn install && yarn jest && yarn build

FROM nginx:alpine as production-build
COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy from the stahg 1
COPY --from=builder /vue-ui/dist /usr/share/nginx/html

EXPOSE 80
EXPOSE 443
ENTRYPOINT ["nginx", "-g", "daemon off;"]