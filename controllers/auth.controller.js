const UserModel = require("../models/user.model");
module.exports.signUp = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const newUser = await UserModel.create({ username, email, password });
    res.status(201).json({ user: newUser._id });
  } catch (err) {
    res.status(500).send({ error: err.mesage });
  }
};
