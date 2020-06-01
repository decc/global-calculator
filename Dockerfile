# This is a Dockerfile. 
#
# TRIGGER LINES
# GO1
#
# It is a quick way of getting a server running with this code.
# See http://docker.io for more details.
#
# Use phusion/passenger-full as base image.
# See https://github.com/phusion/passenger-docker for more information
FROM phusion/passenger-ruby22
MAINTAINER tom@counsell.org

# Set correct environment variables.
ENV HOME /root

# Use baseimage-docker's init process.
CMD ["/sbin/my_init"]

# Clean up APT when done.
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Make sure we are using Ruby 2.1
#RUN ruby-switch --set ruby2.1

# Remove the default Nginx configuration
RUN rm -f /etc/nginx/sites-enabled/default

# Enable Nginx server
RUN rm -f /etc/service/nginx/down

# Add the nginx configuration for the server which will be on port 8080
ADD util/nginx.conf /etc/nginx/sites-enabled/2050.conf

# Add the source code in this directory to the docker image
ADD . /home/app/2050

# Install the dependencies for the app
WORKDIR /home/app/2050
RUN bundle

# Compile the C code
WORKDIR /home/app/2050/model/global_2050_model
RUN bundle exec rake

# Download the map images
# WORKDIR  /home/app/2050/public/gc-anim
# RUN wget -nH --cut-dirs=1 --no-parent -r http://d2ow8032j7094s.cloudfront.net/20150123/index.html

# Now need to build this image
# e.g., docker build .
#
# Then need to run this image
# docker run -p 8080:8080 -d <image-id>
#
# Then server in the contianer will be available on 8080
#
# If testing on osx then will also need to do:
# boot2docker ip
# to find out what ip address the server will be on
