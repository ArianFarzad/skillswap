import { Request, Response } from 'express';
import logger from '../utils/logger';
import fs from 'fs';
import multer from 'multer';
import Session from '../models/Session';
import Event from '../models/Event';
import ical from 'ical-generator';
import ICAL from 'ical.js';

const upload = multer({ dest: 'uploads/' });

export const importEvent = [
  upload.single('file'),
  async (req: Request, res: Response) => {
    const sessionId = req.params.sessionId;

    if (!req.file) {
      return res.status(400).json({ error: 'error.no_file_uploaded' });
    }

    logger.info('Received file:', req.file);

    const filePath = req.file.path;

    try {
      const data = fs.readFileSync(filePath, 'utf8');

      // Parse ical data using ical.js
      const jcalData = ICAL.parse(data);
      const comp = new ICAL.Component(jcalData);
      const vevents = comp.getAllSubcomponents('vevent');
      const events = vevents.map(vevent => {
        const event = new ICAL.Event(vevent);
        return {
          summary: event.summary || '',
          description: event.description || '',
          start: event.startDate.toJSDate(),
          end: event.endDate.toJSDate(),
        };
      });

      const session = await Session.findById(sessionId);
      if (!session) {
        return res.status(404).json({ error: 'Session not found' });
      }

      const savedEvents = await Event.insertMany(
        events.map(event => ({
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
  res.status(200).json(events);
};

export const createEvent = async (req: Request, res: Response) => {
  const sessionId = req.params.sessionId;
  const { summary, description, start, end } = req.body;

  try {
    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    const newEvent = new Event({
      summary,
      description,
      start,
      end,
      session: sessionId,
    });

    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    logger.error(`Error creating event: ${error}`);
    res.status(500).json({ error: 'Error creating event' });
  }
};

export const downloadEventAsICS = async (req: Request, res: Response) => {
  const eventId = req.params.eventId;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    const calendar = ical({ name: 'My Calendar' });
    calendar.createEvent({
      start: new Date(event.start),
      end: new Date(event.end),
      summary: event.summary,
      description: event.description,
    });

    const icsFile = calendar.toString();
    res.setHeader('Content-Disposition', 'attachment; filename=event.ics');
    res.setHeader('Content-Type', 'text/calendar');
    res.send(icsFile);
  } catch (error) {
    logger.error(`Error downloading event as ICS: ${error}`);
    res.status(500).json({ error: 'Error downloading event as ICS' });
  }
};
