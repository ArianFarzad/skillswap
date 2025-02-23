# FWE Skillswap

## Beschreibung

FWE Skillswap ist eine Plattform, die darauf abzielt, Gamification-Elemente und Feedback-Prozesse in Schulungs- und
Lernumgebungen zu verbessern. Die Plattform fördert den Peer-to-Peer-Austausch von Wissen und Fähigkeiten und
konzentriert sich auf eine geldfreie Interaktion, die soziale Netzwerke und Lernplattformen verbindet.

---

## Inhaltsverzeichnis

1. [Installation](#installation)
2. [Backend-Funktionalitäten](#backend-funktionalitäten)
3. [Frontend-Funktionalitäten](#frontend-funktionalitäten)
4. [API-Endpunkte](#api-endpunkte)
5. [Datenbankstruktur](#datenbankstruktur)
6. [Authentifizierung & Sicherheit](#authentifizierung--sicherheit)
7. [Gamification & Feedback](#gamification--feedback)
8. [Abhängigkeiten](#abhängigkeiten)
9. [Konfigurationsdateien](#konfigurationsdateien)
10. [Mitwirkende](#mitwirkende)
11. [Lizenz](#lizenz)

---

## Installation

### Voraussetzungen

- **Node.js** (Version 16 oder höher)
- **npm**
- **MongoDB**

### Backend

1. Navigiere in das Backend-Verzeichnis:
   ```bash
   cd backend
   ```
2. Installiere Abhängigkeiten:
   ```bash
   npm install
   ```
3. Starte den Entwicklungsserver:
   ```bash
   npm run dev
   ```

### Frontend

1. Navigiere in das Frontend-Verzeichnis:
   ```bash
   cd frontend
   ```
2. Installiere Abhängigkeiten:
   ```bash
   npm install
   ```
3. Starte die Entwicklungsumgebung:
   ```bash
   npm run dev
   ```

---

## Backend-Funktionalitäten

Das Backend basiert auf **Node.js** mit **Express.js** und kommuniziert mit einer **MongoDB-Datenbank**.

### Wichtige Funktionen:

- **Authentifizierung** (JWT-basiert)
- **Profilverwaltung** (Erstellung, Aktualisierung, Löschung)
- **Sitzungen & Buchungen** (Terminplanung)
- **Gamification** (Punktevergabe, Leaderboard)
- **Feedback-System** (Bewertungen, Kommentare)
- **Socket.IO** für Echtzeit-Kommunikation

---

## Frontend-Funktionalitäten

Das Frontend ist mit **React (Vite) und TypeScript** entwickelt.

### Kernkomponenten:

- **Benutzerregistrierung & Login**
- **Dashboard mit Profilverwaltung**
- **Terminbuchung & Kalender**
- **Live-Chat & Kommunikation**
- **Gamification**
- **Feedback-System**

---

## API-Endpunkte

Das Backend stellt mehrere API-Endpunkte zur Verfügung, die für Authentifizierung, Profilverwaltung, Gamification,
Kalender, Sitzungen, Feedback und Nachrichten verwendet werden. Eine vollständige Liste ist in der API-Dokumentation zu
finden.

**Wichtige Endpunkte:**

| Methode | Endpoint                 | Beschreibung             |
|---------|--------------------------|--------------------------|
| POST    | /api/auth/register       | Benutzerregistrierung    |
| POST    | /api/auth/login          | Benutzer-Login           |
| GET     | /api/profiles/:id        | Einzelnes Profil abrufen |
| PUT     | /api/profiles/:id        | Profil aktualisieren     |
| DELETE  | /api/profiles/:id        | Profil löschen           |
| POST    | /api/sessions            | Sitzung erstellen        |
| GET     | /api/sessions/:id        | Sitzung abrufen          |
| PUT     | /api/sessions/:id        | Sitzung aktualisieren    |
| DELETE  | /api/sessions/:id        | Sitzung löschen          |
| POST    | /api/feedbacks           | Feedback erstellen       |
| GET     | /api/gamification/points | Punktestand abrufen      |

Weitere Endpunkte sind direkt im Code einsehbar unter [app](backend/src/app.ts) und [routes](backend/src/routes).

---

## Datenbankstruktur

Die Plattform nutzt **MongoDB** für die Speicherung von Daten. Hier sind die wichtigsten Collections:

- **users**: Enthält Benutzerdaten (E-Mail, Passwort-Hash, Rollen, Registrierungshistorie).
- **profiles**: Speichert Profildaten wie Fähigkeiten, Interessen und persönliche Informationen.
- **sessions**: Enthält alle geplanten und vergangenen Sitzungen.
- **feedbacks**: Speichert Bewertungen und Kommentare zu Sitzungen.
- **gamification**: Enthält Punktestände und Leaderboard-Daten.

---

## Authentifizierung & Sicherheit

- **JWT-Token** zur Authentifizierung
- **Passwort-Hashing mit bcrypt**
- **CORS-Schutzmechanismen**
- **Eingabevalidierung**

---

## Gamification & Feedback

Die Plattform nutzt Gamification, um Benutzer zur aktiven Teilnahme zu motivieren:

- **Punkte sammeln** für das Geben von Wissen
- **Feedback-System** für Bewertungen & Kommentare

---

## Abhängigkeiten

Eine vollständige Liste aller Abhängigkeiten befindet sich in den Dateien [backend/package.json](backend/package.json)
und [frontend/package.json](frontend/package.json).

**Wichtige Abhängigkeiten:**

- **Backend:** express, mongoose, jsonwebtoken, bcryptjs, socket.io
- **Frontend:** react, react-router-dom, axios, react-calendar, socket.io-client

---

## Konfigurationsdateien

Das Projekt verwendet `.env`-Dateien für Umgebungsvariablen.

### `.env.test` Datei :

```
MONGO_URI='mongodb://localhost:27017/skill-swap-test'
JWT_SECRET='your_jwt_secret'
JWT_REFRESH_SECRET='your_refresh_token_secret'
CLOUDINARY_CLOUD_NAME=<your_cloud_name>
CLOUDINARY_API_KEY=<your_api_key>
CLOUDINARY_API_SECRET=<your_api_secret>
```

Bitte die Credentials mit den echten Werten ersetzen und die `.env.test` umbenennen zum `.env`.

---

## Mitwirkende

| Name           | Rolle                |
|----------------|----------------------|
| Dias Baikenov  | Backend-Entwicklung  |
| Bogdan Polskiy | Backend-Entwicklung  |
| Yusuf Birdane  | Frontend-Entwicklung |
| Arian Farzad   | Frontend-Entwicklung |

---

## Lizenz

Dieses Projekt steht unter der **MIT-Lizenz**. Mehr Informationen findest du in der `LICENSE`-Datei.

