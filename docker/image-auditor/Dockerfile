############################################################
# Dockerfile to build image-auditor
# Labo DockerMusic
# April 2017
############################################################

FROM node:6.10.2

MAINTAINER LuanaMartelli <luana.martelli@heig-vd.ch>

COPY src /opt/app/

WORKDIR /opt/app/

RUN npm install

EXPOSE 2205

ENTRYPOINT ["node", "/opt/app/auditor.js"]
