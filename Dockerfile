# docker build -t sleepyzzz-api .
# docker run -d -p 80:80 sleepyzzz-api
# docker ps -a
# docker exec -it <container id> bash

# To stop: docker stop <container id>
# To remove: docker rm <container id>

# To list images: docker images -a
# To delete images: docker rmi <ImageId>

FROM ubuntu
RUN apt-get update
RUN apt-get -y install apt-utils curl

# Configure NGINX
RUN apt-get -y install nginx
RUN rm -v /etc/nginx/nginx.conf
ADD deploy/nginx.conf /etc/nginx/

# Install node.js and pm2
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get -y install nodejs
RUN npm install pm2 -g
ADD deploy/ecosystem.config.js /
RUN mkdir /var/www/production

# Build Backend
ADD server /var/www/production/sleepyzzz-api
RUN cd /var/www/production/sleepyzzz-api && npm install

EXPOSE 80

CMD pm2 start ecosystem.config.js && service nginx start && pm2 logs
