const mongoose = require("mongoose");
const ObjectID = mongoose.Types.ObjectId;
const UserModel = require("../models/user.model");

module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find().select("-password");
  res.json(users);
};

module.exports.userInfo = async (req, res) => {
  try {
    if (!ObjectID.isValid(req.params.id))
      return res.status(404).send("ID inconnu : " + req.params.id);

    const user = await UserModel.findById(req.params.id).select("-password");
    if (!user) return res.status(404).send("Utilisateur non trouvé");
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports.updateUser = async (req, res) => {
  try {
    if (!ObjectID.isValid(req.params.id))
      return res.status(404).send("ID inconnu : " + req.params.id);

    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { bio: req.body.bio } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    if (!updatedUser) return res.status(404).send("Utilisateur non trouvé");

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports.deleteUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(404).send("ID inconnu : " + req.params.id);
  try {
    await UserModel.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "successfully deleted. " });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
