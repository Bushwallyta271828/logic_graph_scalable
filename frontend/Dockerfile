FROM node:20-alpine

#WORKDIR /src/app

COPY . .
#COPY ../../scripts ./scripts

RUN cd /src/app && \
    npx next telemetry disable && \
    npm ci && \
    npm run build && \
    chmod -R +x ./scripts

ENV PATH="./scripts:$PATH"

CMD ["run.sh"]
