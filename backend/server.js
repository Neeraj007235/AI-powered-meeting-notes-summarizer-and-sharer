import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import summaryRoutes from './routes/summaryRoutes.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/api/summaries', summaryRoutes);

if (process.env.NODE_ENV === "production") {
  const distPath = path.join(__dirname, "../frontend/dist");

  if (fs.existsSync(distPath)) {
    console.log('Serving frontend from:', distPath);
    app.use(express.static(distPath));

    // Catch-all fallback **without route parsing**
    app.use((req, res, next) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  } else {
    console.warn('Frontend dist folder not found. Skipping static file setup.');
  }
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.error('MongoDB connection error:', err));
