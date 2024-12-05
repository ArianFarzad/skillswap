# Verwende ein Node.js-Image als Basis
FROM node:18

# Setze das Arbeitsverzeichnis für das Backend
WORKDIR /usr/src/app/backend

# Kopiere package.json und package-lock.json für das Backend
COPY backend/package*.json ./

# Installiere die Abhängigkeiten für das Backend
RUN npm install

# Kopiere den Rest des Backend-Quellcodes
COPY backend .

# Baue das Backend TypeScript-Projekt
RUN npm run build

# Setze das Arbeitsverzeichnis für das Frontend
WORKDIR /usr/src/app/frontend

# Kopiere package.json und package-lock.json für das Frontend
COPY frontend/package*.json ./

# Installiere die Abhängigkeiten für das Frontend
RUN npm install

# Kopiere den Rest des Frontend-Quellcodes
COPY frontend .

# Baue das Frontend-Projekt
RUN npm run build

# Exponiere die Ports für Backend und Frontend
EXPOSE 5000 3000

# Starte sowohl das Backend als auch das Frontend
CMD ["sh", "-c", "cd /usr/src/app/backend && node dist/server.js & cd /usr/src/app/frontend && npm start"]