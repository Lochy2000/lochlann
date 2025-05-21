import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes.js";
import { setupVite, serveStatic, log } from "./vite.js";

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

  // Try different ports if the default one is in use
  const tryPort = (port: number, maxAttempts: number = 5) => {
    if (maxAttempts <= 0) {
      log(`Could not find an available port after ${maxAttempts} attempts`);
      process.exit(1);
      return;
    }

    server.listen({
      port,
      host: "localhost",
    }).on('error', (error: any) => {
      if (error.code === 'EADDRINUSE') {
        log(`Port ${port} is in use, trying port ${port + 10}...`);
        tryPort(port + 10, maxAttempts - 1);
      } else {
        log(`Error starting server: ${error.message}`);
        throw error;
      }
    }).on('listening', () => {
      log(`Server running at http://localhost:${port}`);
    });
  };

  // Start with port 5000 and try up to 5 different ports
  tryPort(5000);
})();