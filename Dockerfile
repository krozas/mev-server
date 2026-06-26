# syntax=docker/dockerfile:1 
ARG NODE_VERSION=23.11.0
FROM node:${NODE_VERSION}-alpine 

# Use development node environment by default. 
ENV NODE_ENV development 

# Declaro las variables
ENV DIR /mev-server

# Creo el directorio en el contenedor
WORKDIR ${DIR}

# Copy package.json and package-lock.json to the working directory 
COPY package.json package-lock.json ./ 

# Install dependencies 
RUN npm install 

# Copy the rest of the source files into the image 
COPY . . 

# Change ownership of the /${DIR} directory to the node user 
RUN chown -R node:node ${DIR}

# Switch to the node user 
USER node 

# Ensure node_modules/.bin is in the PATH
ENV PATH ${DIR}/node_modules/.bin:$PATH 

# Expose the port that the application listens on 
EXPOSE 9100 

# Run the application 
CMD ["npm", "run", "dev"]