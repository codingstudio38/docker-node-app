FROM node:latest
run npm install -g nodemon
WORKDIR /node-app
COPY . .
run npm install
EXPOSE 5000
CMD ["npm", "run", "start"]

#docker build -t docker-node-app .<- for pushing the image to docker hub
#docker images<- for showing the images in local
#docker run -p 5000:5000 docker-node-app<- for running the container