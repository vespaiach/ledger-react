FROM node:12 AS web_builder
ARG NODE_ENV=production
ARG REACT_APP_BASE_URL=/api
WORKDIR /app
COPY ["./packages/web/package.json", "./packages/web/package-lock.json", "/app/"]
RUN npm ci
COPY "./packages/web/" "/app/"
RUN npm run build

FROM node:12 AS server_builder
WORKDIR /app
COPY ["./packages/server/package.json", "./packages/server/package-lock.json", "/app/"]
RUN npm ci
COPY "./packages/server/" "/app/"
RUN npm run build

FROM node:12-slim as runtime
WORKDIR /app
ENV NODE_ENV=production
COPY --from=server_builder "/app/build/" "/app/"
COPY --from=server_builder "/app/node_modules/" "/app/node_modules/"
COPY --from=server_builder "/app/package.json" "/app/package.json"
WORKDIR public
COPY --from=web_builder "/app/build/" "/app/public"
COPY --from=web_builder "/app/build/index.html" "/app/resources/home.edge"
CMD ["npm", "run", "start"]