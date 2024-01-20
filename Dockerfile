# STAGE 1
FROM node:18.17.1 as builder
WORKDIR /backend-app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build-container

# STAGE 2
FROM node:18.17.1
WORKDIR /backend-app
COPY package*.json ./
RUN npm install --production
COPY --from=builder /backend-app/dist ./dist
COPY . .

EXPOSE 4000
CMD [ "node", "dist/index.js" ]