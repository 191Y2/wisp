import express from "express";
import { createServer } from "node:http";
import wisp from "wisp-server-node";

const app = express();

app.get("/", (req, res) => {
  res.status(200).send("wisp server is running — paste 'wss://" + req.get("host") + "/' into your app's Settings");
});

app.use((req, res) => {
  res.status(404).send("not found");
});

const server = createServer();
server.on("request", app);
server.on("upgrade", (req, socket, head) => {
  wisp.routeRequest(req, socket, head);
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log("wisp server listening on port " + PORT);
});
