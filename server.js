import express from "express";
import { server as wisp } from "@mercuryworkshop/wisp-js/server";

const app = express();

app.get("/", (req, res) => {
  res.status(200).send("wisp server is running — paste 'wss://" + req.get("host") + "/' into your app's Settings");
});

app.use((req, res) => {
  res.status(404).send("not found");
});

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log("wisp server listening on port " + PORT);
});

server.on("upgrade", (req, socket, head) => {
  wisp.routeRequest(req, socket, head);
});
