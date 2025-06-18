FROM node:22.15.0-alpine

WORKDIR /app

COPY frontend/package*.json ./frontend/
COPY backend/package*.json ./backend/

WORKDIR /app/backend
RUN npm ci --only=production
WORKDIR /app/frontend
RUN npm ci

WORKDIR /app
COPY ./backend/ ./backend/
COPY ./frontend/ ./frontend/

COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

CMD ["/app/entrypoint.sh"]