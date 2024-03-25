FROM node:20-alpine

WORKDIR /src/app

COPY package*.json ./

RUN npx next telemetry disable && \
    npm ci

COPY . .

RUN npm run build

EXPOSE 3000

RUN chmod -R +x ../../scripts

ENV PATH="/scripts:$PATH"

CMD ["run.sh"]
