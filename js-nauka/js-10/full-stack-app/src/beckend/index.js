const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.post("/authenticate", async (req, res) => {
  const { username } = req.body;

  af214f39-3c2c-4726-8d46-1cff7f14ed3e
  return res.json({ username: username, secret: "sha256..." });
});

app.listen(3001);