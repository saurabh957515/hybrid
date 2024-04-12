FROM node:19
WORKDIR /app
COPY packag*.json ./
RUN npm install
COPY . .
ENV PORT=5000
EXPOSE 5000
CMD ["npm","start"]