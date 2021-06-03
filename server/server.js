const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");

app.use(express.json());
app.use(cors({ origin: `${process.env.CLIENT_URL}`, credentials: true }));
app.use(
  cookieSession({
    maxAge: 1000 * 60 * 60 * 24, //24 HOURS
    keys: [process.env.COOKIE_SECRET],
  })
);
app.set("trust proxy", 1);

const port = process.env.PORT || 5000;
const server = app.listen(port, console.log(`Server started on port ${port}`));

// * io setup
const io = require("socket.io")(server, { cors: true });