import express from "express";
import { config } from "dotenv";
import { readFileSync } from "fs";
import { createServer, ServerOptions } from "https";

config();
config({ path: ".env.local", override: true });

// load SSL cert and key files
const httpsOptions: ServerOptions = {
  key: readFileSync("../certs/localhost-key.pem"),
  cert: readFileSync("../certs/localhost.pem"),
};

const app = express();

app.get("/", (_req, res) => {
  res.send("Hello from SSL server!");
});

const port = process.env.PORT || 3001;
// wrap express app in an https server
createServer(httpsOptions, app)
  .on("error", (err) => console.error(err))
  .listen(port, () =>
    console.log(`Server is running on https://localhost:${port}`)
  );
