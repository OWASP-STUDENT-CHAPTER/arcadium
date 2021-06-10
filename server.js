const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
// const cookieSession = require("cookie-session");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const passport = require("passport");

// * Models
const Team = require("./team/model");

// *  init event config
require("./init/initConfig");
//
// * init DB
require("./init/db");

require("./init/initModels");

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({ origin: `${process.env.CLIENT_URL}`, credentials: true }));
// app.use(
//   cookieSession({
//     maxAge: 1000 * 60 * 60 * 24, //24 HOURS
//     keys: [process.env.COOKIE_SECRET],
//   })
// );
// app.set("trust proxy", 1);
// app.use(cookieParser());

app.use(
  session({
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI_COMMON_DB }),
    // store: MongoStore.create({ client: commonDB}),
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000, /*secure: true,*/ httpOnly: true },
  })
);

// * init passport
require("./init/passportParticipant");
app.use(passport.initialize());
app.use(passport.session());

// * Routes
app.use("/api/auth", require("./auth/routes"));
app.use("/api/team", require("./team/routes"));

const port = process.env.PORT || 5000;
const server = app.listen(port, console.log(`Server started on port ${port}`));

// * io setup

const io = require("socket.io")(server, { cors: true });
// const io = require("socket.io")(server, {
// cors: {
//   origin: process.env.CLIENT_URL,
//   methods: ["GET", "POST"],
// },
// allowRequest: (req, callback) => {
//   console.log("allow req", req.headers);
//   // const isOriginValid = check(req);
//   callback(null, true);
// },
// });
// io.use(function (socket, next) {
//   console.log("s");
//   // next(null, false);
// });
// io.on("connection", () => console.log("a"));
io.use(async function (socket, next) {
  // console.log("a", socket.handshake.query.teamId);

  const team = await Team.findById(socket.handshake.query.teamId);
  // console.log("team ", team);
  if (!team) {
    next(new Error("Authentication error"));
  }
  return next();
  // call next() with an Error if you need to reject the connection.
});
// io.set("origins", process.env.CLIENT_URL);

require("./init/initSocket")(io);

// * Production setup
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "Client", "build")));
  app.get("/*", function (req, res) {
    // this -->
    res.cookie("XSRF-TOKEN", req.csrfToken());
    res.sendFile(path.resolve(__dirname, "Client", "build", "index.html"));
  });

  // Handle unhandled promise rejections
  process.on("unhandledRejection", (err, promise) => {
    console.log(`Error: ${err.message}`);
  });

  process.on("uncaughtException", (err, promise) => {
    console.log(`Error: ${err.message}`);
  });
}
