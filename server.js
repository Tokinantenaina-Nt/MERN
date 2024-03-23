const express = require("express");
const userRoutes = require("./routes/user.routes");
require("dotenv").config({ path: "./config/.env" });
require("./config/dbConnex");
const PORT = process.env.PORT || 5000;
const app = express();
const bodyParser = require("body-parser");

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routes
app.use("/api/user", userRoutes);

//server
app.listen(PORT, () => {
  console.log("listen on " + PORT);
});
