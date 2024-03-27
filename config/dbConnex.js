const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDb");
  })
  .catch(err => {
    console.log("Failed to connect to MongoDB " + err);
    process.exit(1);
  });
