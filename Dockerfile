# Dockerfile
FROM node:18

# Diretório de trabalho dentro do container
WORKDIR /app

# Copiar arquivos
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
