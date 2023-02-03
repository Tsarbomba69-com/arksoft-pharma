FROM node:latest as build

RUN mkdir /usr/src/app

WORKDIR /usr/src/app

COPY . .

RUN npm install -g @angular/cli

RUN npm run build --prod

FROM nginx:latest

COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80
