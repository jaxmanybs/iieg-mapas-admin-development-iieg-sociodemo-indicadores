FROM node:10 as node
WORKDIR /app
COPY ./ /app/
RUN npm install
RUN npm run build -- --prod
# RUN node --max_old_space_size=10240 node_modules/@angular/cli/bin/ng build --prod "--prod"

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.17.1-alpine
COPY --from=node /app/docs /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
