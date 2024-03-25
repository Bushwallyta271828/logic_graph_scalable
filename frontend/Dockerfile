FROM node:20-alpine

COPY package*.json /

RUN npx next telemetry disable && \
    npm ci

COPY . /

RUN npm run build && \
    chmod -R +x /scripts

ENV PATH="/scripts:$PATH"

CMD ["run.sh"]
