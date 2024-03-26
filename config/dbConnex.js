const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("connected to MongoDb");
  })
  .catch(err => {
    console.log("Failed to connect to MongoDB " + err);
    process.exit(1);
  });
