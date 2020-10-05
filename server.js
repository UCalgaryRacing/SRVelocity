const express = require("express");
const app = express();
const session = require("express-session");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const lusca = require("lusca");
const cors = require("cors");
const path = require("path");
const socketIOClient = require("socket.io-client");
const api = require("./Util/call");
const PORT = 5000;

//Setup
api.setPrefixURL("http://localhost:7000");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(path.join(__dirname, "client/build")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
app.get("/streaming", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
app.get("/historical", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
app.get("/manage", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
app.get("/signin", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
app.get("/licenses", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.use(
  session({
    secret: "xCufvwEyu14Tuu7l",
    resave: true,
    saveUninitialized: true,
    secure: true,
  })
);
app.use(cookieParser());

//Import routes
const pgDatabase = require("./Router/pgDatabase");
const dataServer = require("./Router/dataServer");

//Setup routes
app.use("/api/pgdb", pgDatabase);
app.use("/historical", dataServer);

//Import Routes
// const log = require("./Router/log");
// const race = require("./Router/race");
// const sensor = require("./Router/sensor");
// const subteam = require("./Router/subteam");
// const team = require("./Router/team");
// const vehicle = require("./Router/vehicle");
const teamMember = require("./Router/teamMember");
const driver = require("./Router/driver");

//Add Routes
// app.use("/log", log);
// app.use("/race", race);
// app.use("/sensor", sensor);
// app.use("/subteam", subteam);
// app.use("/team", team);
// app.use("/vehicle", vehicle);
app.use("/teamMember", teamMember);
app.use("/driver", driver);

//Python and React socket setup
var io = require("socket.io")(4000);

//Socket to connect to run_data server

const socket = socketIOClient("http://127.0.0.1:5500", {
  //CHANGE WHEN DEPLOYING!
  reconnection: true,
});

socket.on("new data", (data) => {
  io.emit(data);
});

//Begin
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
