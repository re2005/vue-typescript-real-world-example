FROM node AS builder

ENV APP_ROOT /app
WORKDIR ${APP_ROOT}

ADD . ${APP_ROOT}
RUN npm install
RUN npm rebuild node-sass
RUN npm run lint --fix
RUN npm run test
RUN npm run build

FROM nginx:stable

COPY --from=builder /app/nginx/default.conf /etc/nginx/conf.d/
COPY --from=builder /app/nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist/ /usr/share/nginx/html

RUN addgroup --gid 1000 --system app && \
    adduser --uid 1000 --system app --ingroup app

RUN touch /var/run/nginx.pid && \
  chown -R app:app /var/run/nginx.pid && \
  chown -R app:app /var/cache/nginx

USER 1000

EXPOSE 8080
