# FWE Skillswap

## Beschreibung

FWE Skillswap ist eine Plattform, die darauf abzielt, Gamification-Elemente und Feedback-Prozesse in Schulungs- und
Lernumgebungen zu verbessern. Die Plattform fördert den Peer-to-Peer-Austausch von Wissen und Fähigkeiten und
konzentriert sich auf eine geldfreie Interaktion, die soziale Netzwerke und Lernplattformen verbindet.

---

## Inhaltsverzeichnis

1. [Installation](#installation)
2. [Umgebungsvariablen](#umgebungsvariablen)
3. [Verwendung](#verwendung)
4. [API-Endpunkte](#api-endpunkte)
5. [Datenbankstruktur](#datenbankstruktur)
6. [E-Mail-Service](#e-mail-service)
7. [Feature Requests](#feature-requests)
8. [Mitwirkende](#mitwirkende)
9. [Lizenz](#lizenz)

---

## Installation

### Voraussetzungen

- Node.js (Version 16 oder höher)
- npm
- MongoDB

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
   npm start
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

## Umgebungsvariablen

Die Backend-Anwendung erfordert eine Konfigurationsdatei `.env`. Beispiel:

```env
DATABASE_URL=postgres://username:password@localhost:5432/fwe_skillswap
JWT_SECRET=dein_jwt_geheimnis
EMAIL_SERVICE=smtp.gmail.com
EMAIL_USER=deine_email@gmail.com
EMAIL_PASS=dein_email_passwort
```

Weitere Details befinden sich in der Datei `.env.test` für Tests.

---

## Verwendung

### Umgesetzte Features

1. **Benutzerregistrierung und Authentifizierung**: Nutzer können sich registrieren und sicher anmelden (JWT-basiert).
2. **Profilverwaltung**: Nutzer können Fähigkeiten und Interessen zu ihrem Profil hinzufügen und bearbeiten.
3. **Skill-Matching**: Suche und Filterung nach Fähigkeiten, um passende Lernpartner zu finden.
4. **Sitzungsbuchung**: Integration mit Google Calendar, um Sitzungen zu planen und Erinnerungen zu erhalten.
5. **Feedback-System**: Bewertungen und Kommentare nach abgeschlossenen Sitzungen.

### Nice-to-Have Features

1. **Gamification**: Nutzer erhalten Punkte für ihre Hilfeleistungen.
2. **Mehrsprachigkeit**: Implementierung mit `react-intl`.
3. **Gruppen und Foren**: Diskussionsbereiche für Nutzer.
4. **Nutzerstatistiken**: Einblicke in die Aktivitäten und den Fortschritt der Nutzer.

---

## API-Endpunkte

### Authentifizierung

- POST `/api/auth/register` - Registriert einen neuen Nutzer.
- POST `/api/auth/login` - Authentifiziert einen Nutzer.

### Profile

- GET `/api/profile` - Holt das Profil des aktuellen Nutzers.
- PUT `/api/profile` - Aktualisiert Nutzerdaten.

### Feedback

- GET `/api/feedback` - Holt alle Feedbacks.
- POST `/api/feedback` - Erstellt ein neues Feedback.

### Gamification

- PUT `/api/gamification/points` - Fügt dem Nutzer Punkte hinzu. Authentifizierung über JWT erforderlich.
- GET `/api/gamification/points` - Ruft die Punkte eines Nutzers ab. Authentifizierung über JWT erforderlich.

### Sitzungen

- POST `/api/sessions` - Erstellt eine neue Sitzung. Authentifizierung über JWT erforderlich.
- GET `/api/sessions` - Ruft alle Sitzungen des Nutzers ab. Authentifizierung über JWT erforderlich.
- PATCH `/api/sessions/:id` - Aktualisiert die Sitzung mit der angegebenen ID. Authentifizierung über JWT erforderlich.
- DELETE `/api/sessions/:id` - Löscht die Sitzung mit der angegebenen ID. Authentifizierung über JWT erforderlich.

---

## Datenbankstruktur

Die wichtigsten Tabellen:

### User

| Spalte   | Typ    | Beschreibung       |
|----------|--------|--------------------|
| id       | UUID   | Primärschlüssel    |
| email    | String | E-Mail des Nutzers |
| password | String | Gehashtes Passwort |

### Feedback

| Spalte  | Typ  | Beschreibung    |
|---------|------|-----------------|
| id      | UUID | Primärschlüssel |
| content | Text | Feedback-Inhalt |
| userId  | UUID | ID des Nutzers  |

### Profiles

| Spalte    | Typ   | Beschreibung                  |
|-----------|-------|-------------------------------|
| id        | UUID  | Primärschlüssel               |
| userId    | UUID  | Referenz auf die User-Tabelle |
| skills    | Array | Liste der Fähigkeiten         |
| interests | Array | Liste der Interessen          |

### Sessions

| Spalte          | Typ      | Beschreibung                                     |
|-----------------|----------|--------------------------------------------------|
| id              | UUID     | Primärschlüssel                                  |
| userId          | UUID     | ID des Buchenden                                 |
| skillProviderId | UUID     | ID des Anbieters                                 |
| date            | DateTime | Datum und Uhrzeit der Sitzung                    |
| status          | String   | Status der Sitzung (z.B. geplant, abgeschlossen) |

---

## E-Mail-Service

Das Projekt verwendet Nodemailer zur Verwaltung von E-Mails. Beispiel-Konfiguration in `src/utils/nodemailer.ts`:

```javascript
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
```

---

## Feature Requests

- Erweiterte Statistiken zur Feedback-Nutzung
- Mobile App-Unterstützung
- Zusätzliche Sprachen

---

## Mitwirkende

- **Dias Baikenov**: Backend-Entwicklung
- **Bogdan Polskiy**: Backend-Entwicklung
- **Yusuf Birdane**: Frontend-Entwicklung
- **Arian Farzad**: Frontend-Entwicklung

---

## Lizenz

Dieses Projekt ist unter der [MIT-Lizenz](LICENSE) lizenziert.

---



