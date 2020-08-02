FROM node:stretch-slim

COPY ./ /usr/share/chat

RUN cd /usr/share/chat && npm install && npm run build

CMD cd /usr/share/chat && npm run dev