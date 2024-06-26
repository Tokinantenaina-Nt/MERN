const express = require("express");
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
require("dotenv").config({ path: "./config/.env" });
require("./config/dbConnex");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { checkUser, requireAuth } = require("./middleware/auth.middleware");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");

const upload_checking_error = require("./middleware/uploadError.middleware");
const allowedOrigins = "http://localhost:5173";
const corsOptions = {
  // origin: function(origin, callback) {
  //   if (!origin || allowedOrigins.includes(origin)) {
  //     callback(null, true);
  //   } else {
  //     callback(new Error("Not allowed by CORS"));
  //   }
  // },
  origin: allowedOrigins,
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: ["GET", "POST", "PUT", "DELETE", "HEAD", "PATCH"],
  preflightContinue: false
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//jwt
app.get("*", checkUser);
app.get("/jwtid", requireAuth, (req, res) => {
  if (res.locals.user) {
    res.status(200).send(res.locals.user._id);
  } else {
    res.status(401).json({ message: "Utilisateur non authentifié" });
  }
});

//routes
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

//middleware upload error
app.use("*/upload", upload_checking_error);

//server
app.listen(PORT, () => {
  console.log("listen on " + PORT);
});
