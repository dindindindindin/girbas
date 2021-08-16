const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const fs = require("fs");
require("dotenv").config();

const app = express();

app.use(morgan("dev"));
app.use(express.json({ limit: "2mb" }));
app.use(cors());

//const db = require("./models");
//db.sequelize.sync({ force: true }).then(() => {
//  console.log("Drop and re-sync db.");
//});

fs.readdirSync("./routes").map((r) =>
  app.use("/api", require("./routes/" + r))
);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
