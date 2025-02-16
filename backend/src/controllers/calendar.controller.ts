import { Request, Response } from 'express';
import logger from '../utils/logger';
import fs from 'fs';
import ical from 'ical';
import multer from 'multer';
import Session from '../models/Session';
import Event from '../models/Event';

const upload = multer({ dest: 'uploads/' });

export const importEvent = [
  upload.single('file'),
  async (req: Request, res: Response) => {
    const sessionId = req.params.sessionId;

    if (!req.file) {
      return res.status(400).json({ error: 'Keine Datei hochgeladen' });
    }

    logger.info('Received file:', req.file);

    const filePath = req.file.path;

    try {
      const data = fs.readFileSync(filePath, 'utf8');

      // Parse ical data
      const parsedData = ical.parseICS(data);
      const events = [];

      for (const key in parsedData) {
        if (Object.prototype.hasOwnProperty.call(parsedData, key)) {
          const event = parsedData[key];
          if (event.type === 'VEVENT') {
            events.push({
              summary: event.summary || '',
              description: event.description || '',
              start: event.start || null,
              end: event.end || null,
            });
          }
        }
      }

      const session = await Session.findById(sessionId);
      if (!session) {
        return res.status(404).json({ error: 'Session not found' });
      }

      const savedEvents = await Event.insertMany(
        events.map((event) => ({
          ...event,
          session: sessionId,
        }))
      );

      res.status(200).json(savedEvents);
    } catch (error) {
      logger.error(`Error importing event: ${error}`);
      res.status(500).json({ error: 'Error importing event' });
    } finally {
      // delete temp file
      fs.unlinkSync(filePath);
    }
  },
];

export const getEvents = async (req: Request, res: Response) => {
  const sessionId = req.params.sessionId;

  const session = await Session.findById(sessionId);
  if (!session) {
    logger.error('Session not found');
    return res.status(404).json({ error: 'Session not found' });
  }

  const events = await Event.find({ session: sessionId });
  logger.info('Events fetched successfully.');

  res.status(200).json(events);
};
