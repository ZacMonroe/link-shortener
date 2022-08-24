import express from "express";
import cors from "cors";
import morganLogger from "morgan";
import { createClient as createRedisClient } from "redis";
import { addRoutes } from "./routes";

export function main() {
  const PORT = 3001;
  const HOST = "localhost";

  const app = express();
  const cache = createRedisClient({ url: "redis://localhost:6379" });

  app.use(morganLogger("combined"));
  app.use(cors());
  addRoutes(app, cache);

  return app.listen(PORT, () => {
    cache.connect().then(() => console.log("Connected to Redis cache."));
    console.log(`Link Shortening server listening at http://${HOST}:${PORT}`);
  });
}

main();
