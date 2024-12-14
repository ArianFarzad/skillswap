import express, { Request, Response } from 'express';
import multer from 'multer';
import ical from 'ical';
import fs from 'fs';
const router = express.Router();

// Multer-Konfiguration für Datei-Uploads
const upload = multer({ dest: 'uploads/' });

// Definieren des Typs für die geparsten Daten
interface ICalEvent {
  type: string;
  summary: string;
  description: string;
  start: Date;
  end: Date;
}

interface ParsedData {
  [key: string]: ICalEvent;
}

// API-Endpunkt zum Hochladen der .ics-Datei
router.post('/calendar/import', upload.single('file'), (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Keine Datei hochgeladen' });
  }
  const filePath = req.file.path;

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Fehler beim Lesen der Datei' });
    }

    const parsedData = ical.parseICS(data);
    const events = [];
    for (const key in parsedData) {
      if (parsedData.hasOwnProperty(key)) {
        const event = parsedData[key];
        if (event.type === 'VEVENT') {
          events.push({
            summary: event.summary,
            description: event.description,
            start: event.start,
            end: event.end,
          });
        }
      }
    }

    res.status(200).json(events);
  });
});

export default router;