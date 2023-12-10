const express = require("express");
const app = express();
require("dotenv").config();

const apiRoutes = require("./routes");
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());

const port = 3000;

app.use(apiRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to GBC Token Swap Backend!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
