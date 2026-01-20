import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes"; // Ensure this import exists if you use it

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Simple health check or API routes if needed
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  return httpServer;
}
