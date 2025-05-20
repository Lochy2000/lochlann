import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes.js";
import { setupVite, serveStatic, log } from "./vite.js";
import { isDatabaseInitialized } from "./db.js"; // Import the database check

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  // Wait for database to be ready before starting the server
  let dbCounter = 0;
  // Check every second for up to 10 seconds if DB is initialized
  while (!isDatabaseInitialized() && dbCounter < 10) {
    console.log(`Waiting for database initialization... (${dbCounter + 1}/10)`);
    await new Promise(resolve => setTimeout(resolve, 1000));
    dbCounter++;
  }
  
  if (!isDatabaseInitialized()) {
    console.error('Database failed to initialize after 10 seconds. Server may not function correctly.');
  }
  
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // Use port 5000 by default, but allow for dynamic port assignment
  // through environment variables to handle port conflicts
  const port = process.env.PORT || 5000;
  server.listen({
    port,
    host: "localhost",
    // reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
