# Etapa 1: Construir la aplicación
FROM node:lts-bullseye AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Etapa 2: Servir la aplicación
FROM nginx:stable-alpine
COPY ./config/default.conf /etc/nginx/conf.d/default.conf
# Copia el build al directorio correcto
COPY --from=build /app/build/ /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]