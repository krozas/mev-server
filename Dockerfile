# 1. Etapa de compilación y dependencias nativas
FROM node:20-alpine AS builder

# Instala herramientas necesarias para compilar better-sqlite3
RUN apk add --no-cache python3 make g++ gcc libc-dev

WORKDIR /usr/src/app

COPY package*.json ./

# Instala TODAS las dependencias (incluye devDependencies para compilar)
RUN npm install

COPY . .

# Compila tu código TypeScript a la carpeta /dist usando tu script de Babel/SWC
RUN npm run build

# 2. Etapa de producción limpia
FROM node:20-alpine
WORKDIR /usr/src/app

COPY package*.json ./

# Instala solo dependencias de producción y vuelve a compilar better-sqlite3 para producción
RUN apk add --no-cache python3 make g++ gcc libc-dev && \
    npm install --omit=dev && \
    apk del python3 make g++ gcc

# Copia la carpeta compilada desde la etapa anterior
COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 3000

# Sobrescribimos el comando "start" problemático ejecutando el archivo compilado directamente sin --env-file
CMD ["node", "dist/app.js"]
# 1. Etapa de compilación (Construye el proyecto)
FROM node:20-slim AS builder

# Instala herramientas nativas de compilación necesarias para C++
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

COPY package*.json ./

# Instala todas las dependencias
RUN npm install

COPY . .

# Compila TypeScript a JavaScript (creará la carpeta /dist)
RUN npm run build


# 2. Etapa de ejecución (Producción ligera)
FROM node:20-slim
WORKDIR /usr/src/app

COPY package*.json ./

# Mantenemos las herramientas en producción solo durante la instalación para que better-sqlite3 no falle
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && npm install --omit=dev \
    && apt-get purge -y --auto-remove python3 make g++ \
    && rm -rf /var/lib/apt/lists/*

# Copia los archivos de código compilados desde la etapa 1
COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 3000

# Arranca directamente el archivo JS compilado ignorando el script "start" con el flag .env
CMD ["node", "dist/app.js"]
