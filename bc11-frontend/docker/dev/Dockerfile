# Dockerfile for dev deployment. 
# Will have to create another file in bc11-frontend/docker/prod for prod deployment
# npm build environment
FROM node:14.1.0 as build
WORKDIR /app
COPY package.json /app/package.json
RUN npm install
RUN npm install react-scripts@3.0.1 -g
COPY . /app
RUN npm run build-dev

# stage environment
FROM nginx:1.16.0-alpine
COPY --from=build /app/dist /var/www/
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]