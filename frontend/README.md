# Frontend des Projekts SkillSwap

## **Überblick**

SkillSwap ist eine Plattform für Peer-to-Peer-Wissensaustausch, die es Nutzern ermöglicht, Fähigkeiten zu teilen und voneinander zu lernen. Das Frontend dieses Projekts ist mit React und TypeScript entwickelt und wird in einem Docker-Container ausgeführt.

## **Features**
- **Benutzerregistrierung und Authentifizierung**: Sicheres Login und Registrierung.
- **Profilverwaltung**: Nutzer können ihre Fähigkeiten und Interessen hinzufügen und bearbeiten.
- **Skill-Matching**: Suche und Filter basierend auf Fähigkeiten.
- **Sitzungsbuchung**: Integration eines Kalenders zur Planung von Sessions mit Benachrichtigungen.

## **Tech Stack**
- **Frontend**: React (TypeScript), CSS
- **Containerisierung**: Docker

## **Installation**
### Voraussetzungen
- [Node.js](https://nodejs.org/) (Version 18 oder höher)
- [Docker](https://www.docker.com/)

### Lokale Installation
1. **Repository klonen**:
   ```bash
   git clone https://code.fbi.h-da.de/stdibaike/fwe-skillswap.git
   cd frontend/react_app
   ```

### Applikation starten
Um die Applikation zu starten:
```bash
docker-compose up --build
```
**Achtung:** Diesen Befehl im `frontend` Verzeichnis ausführen

Nach dem erfolgreichen Start ist das Frontend unter http://localhost:80 verfügbar.
