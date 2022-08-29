FROM node:16-pine
WORKDIR /app
COPY . .
RUN npm install --production
CMD ["node", "server.js"]