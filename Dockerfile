FROM node:14 as base
WORKDIR /workspace

ARG BINARY=terraform-provider-fs
COPY lerna.json package.json yarn.lock tsconfig.json tsconfig.solution.json ./
COPY libs/ libs/
COPY bins/$BINARY/package.json bins/$BINARY/package.json

FROM base as built
# RUN yarn workspace @entropitor/$BINARY install --production --focus
RUN yarn install
COPY bins/$BINARY bins/$BINARY
RUN yarn run build
# RUN (echo "#!/bin/sh" ; echo ./${BINARY}-src/bins/${BINARY}/bin/${BINARY}) > ${BINARY} && chmod u+x ${BINARY}
RUN (echo "#!/usr/bin/env node" ; echo "require(__dirname + \"/${BINARY}-src/bins/${BINARY}/dist/src/index.js\");") > ${BINARY} && chmod u+x ${BINARY}

FROM base as deps
RUN yarn install --production

FROM scratch
ARG BINARY=terraform-provider-fs
COPY --from=deps /workspace/node_modules/ ${BINARY}-src/node_modules/
COPY --from=built /workspace/${BINARY} ./
COPY --from=built /workspace/libs/ ${BINARY}-src/libs/
COPY --from=built /workspace/bins/$BINARY ${BINARY}-src/bins/$BINARY
