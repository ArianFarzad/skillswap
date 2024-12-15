"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const ical_1 = __importDefault(require("ical"));
const fs_1 = __importDefault(require("fs"));
const router = express_1.default.Router();
// Multer-Konfiguration für Datei-Uploads
const upload = (0, multer_1.default)({ dest: 'uploads/' });
// API-Endpunkt zum Hochladen der .ics-Datei
router.post('/calendar/import', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'Keine Datei hochgeladen' });
    }
    const filePath = req.file.path;
    fs_1.default.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Fehler beim Lesen der Datei' });
        }
        const parsedData = ical_1.default.parseICS(data);
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
exports.default = router;
