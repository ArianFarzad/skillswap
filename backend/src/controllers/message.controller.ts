import multer from 'multer';
import { Request, Response } from 'express';
import cloudinary from '../config/cloudinary';
import logger from '../utils/logger';
import fs from 'fs';

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (_req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage }).array('attachments');

export const uploadAttachments = async (req: Request, res: Response) => {
  upload(req, res, async (err) => {
    if (err) {
      logger.error(`Multer upload error: ${err.message}`);
      return res.status(400).json({ error: err.message });
    }
    try {
      const files = (req.files as Express.Multer.File[]) ?? [];

      logger.info(`Uploading ${files.length} files to Cloudinary...`);

      const uploadedFiles = await Promise.all(
        files.map(async (file) => {
          const mimeType = file.mimetype || '';
          const uploadResponse = await cloudinary.uploader.upload(file.path, {
            resource_type: mimeType.includes('image') ? 'image' : 'raw',
            folder: 'chat_attachments',
          });

          fs.unlinkSync(file.path);

          return {
            url: uploadResponse.secure_url,
            type: mimeType.includes('image') ? 'image' : 'pdf',
          };
        })
      );

      logger.info('Files uploaded successfully');
      res.json({ attachments: uploadedFiles });
    } catch {
      res.status(500).json({ error: 'error.file_upload_error' });
    }
  });
};
