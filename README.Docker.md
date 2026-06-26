### Construyendo y ejecutando su aplicación

Ejecutar la aplicación en modo desarrollo:
`docker compose up --build`.

La aplicación se ejecutará en http://localhost:9100.
 

### Deployar la application en el cloud

Primero, crea la imagen, por ejemplo: `docker build -t mev-server .`.

La aplicacion tambien ha sido compartida en https://hub.docker.com/repository/docker/krozas/dgi-mev