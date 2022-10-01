FROM node:current as build

ARG REACT_APP_API_URL

COPY . .
RUN yarn
RUN yarn build

FROM nginx:stable-alpine
COPY --from=build /build /usr/share/nginx/html
COPY --from=build /docker/production/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx"]


