FROM node:20-alpine

WORKDIR /src/app

COPY package*.json ./

RUN npx next telemetry disable && \
    npm ci

COPY . .

RUN npm run build

COPY ../../scripts ./scripts

RUN chmod -R +x ./scripts

ENV PATH="./scripts:$PATH"

CMD ["run.sh"]
