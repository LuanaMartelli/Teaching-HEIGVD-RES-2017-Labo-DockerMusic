############################################################
# Dockerfile to build image-musician
# Labo DockerMusic
# April 2017
############################################################

FROM node:6.10.2

MAINTAINER LuanaMartelli <luana.martelli@heig-vd.ch>

COPY src /opt/app/

RUN cd /opt/app

ENTRYPOINT ["node", "/opt/app/musician.js"]



