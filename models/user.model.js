const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      maxlength: 55,
      minlength: 3,
      trim: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: validator.isEmail,
        message: "{VALUE} n'est pas un adresse mail valide"
      }
    },
    password: {
      type: String,
      required: true,
      maxlenght: 1024,
      minlength: 6
    },
    bio: {
      type: String,
      max: 1024
    },
    picture: {
      type: String,
      default: "./upload/userRandom.jpg"
    },
    following: {
      type: [String]
    },
    followers: {
      type: [String]
    },
    likes: {
      type: [String]
    }
  },
  {
    timestamps: true
  }
);

//use before save to db
userSchema.pre("save", async function(next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;