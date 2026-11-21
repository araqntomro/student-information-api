// src/server.ts
import 'dotenv/config';
import { pool } from './db.js';
import express, { Request, Response, NextFunction } from "express";
import studentRoutes from "./routes/studentRoutes.js";

const app = express();
const port = Number(process.env.PORT ?? 4000);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('PORT must be an integer between 1 and 65535');
}

// Shared logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// JSON parser middleware
app.use(express.json());

app.use(studentRoutes);

// Part H — 404 fallback
app.use((req: Request, res: Response) => {
  res.status(404).json({
    message: "Route not found",
  });
});

// Start server
app.listen(port, '0.0.0.0', () => {
  pool.query('SELECT NOW()')
  .then(() => console.log('Database connected successfully'))
  .catch((error: unknown) => {
    const databaseError = error as { message?: string; code?: string };
    console.error('Database connection failed:', {
      message: databaseError.message,
      code: databaseError.code,
    });
  });
  console.log(`Server is listening on port ${port}`);
});
