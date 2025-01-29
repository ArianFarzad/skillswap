import express, { Request, Response } from 'express';
import multer from 'multer';
import ical from 'ical';
import fs from 'fs';
import logger from '../utils/logger';

const router = express.Router();

// Multer-Konfiguration für Datei-Uploads
const upload = multer({ dest: 'uploads/' });

// API-Endpunkt zum Hochladen der .ics-Datei
router.post('/import', upload.single('file'), (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Keine Datei hochgeladen' });
  }
  logger.info('Received file:', req.file);
  const filePath = req.file.path;

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Fehler beim Lesen der Datei' });
    }

    const parsedData = ical.parseICS(data);
    const events = [];
    for (const key in parsedData) {
      if (Object.prototype.hasOwnProperty.call(parsedData, key)) {
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
