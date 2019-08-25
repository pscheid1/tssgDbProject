# node-dev.Dockerfile: Sets up a node development environment

FROM node:lts
#SHELL ["/usr/bin/env", "bash", "-c"]

EXPOSE 8888

RUN apt-get update && apt-get install -y \ 
  apt-utils \
  curl \
  less \
  tree \
  vim
RUN apt-get -y upgrade
RUN npm install -g npm

USER node:node
RUN mkdir /home/node/app
RUN chown node: /home/node/app
COPY --chown=node:node app /home/node/app/

ENV NPM_CONFIG_LOGLEVEL info

WORKDIR "/home/node/app"

CMD ["/usr/bin/env", "bash"]
