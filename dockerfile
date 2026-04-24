COPY . .
WORKDIR /app

RUN npm install

RUN npm run build

RUN npm run start:prod
