const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = id => {
  return jwt.sign({ id }, process.env.SECRET_TOKEN);
};

module.exports.signUp = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const newUser = await UserModel.create({ username, email, password });
    res.status(201).json({ user: newUser._id });
  } catch (err) {
    res.status(500).send({ error: err.mesage });
  }
};

module.exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge });
    res.status(200).json({ user: user._id });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

module.exports.logout = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
