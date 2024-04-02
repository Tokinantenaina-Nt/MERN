const PostModel = require("../models/post.model");
const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.readPost = (req, res) => {
  PostModel.find()
    .then(docs => {
      res.send(docs);
    })
    .catch(err => {
      console.error("Error fetching data: ", err);
      res.status(500).send("Error fetching data");
    });
};

module.exports.createPost = async (req, res) => {
  const newPost = new PostModel({
    posterId: req.body.posterId,
    message: req.body.message,
    video: req.body.video,
    likers: [],
    comments: []
  });
  try {
    const post = await newPost.save();
    return res.status(201).json(post);
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.updatePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(404).send("ID inconnu : " + req.params.id);

  const updatedRecord = { message: req.body.message };
  try {
    const updatedPost = await PostModel.findByIdAndUpdate(
      req.params.id,
      { $set: updatedRecord },
      { new: true }
    );
    res.send(updatedPost);
  } catch (err) {
    console.error("Erreur lors de la mise à jour du message :", err);
    res.status(500).send("Erreur lors de la mise à jour du message");
  }
};
module.exports.deletePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(404).send("ID inconnu : " + req.params.id);

  try {
    await PostModel.findByIdAndDelete(req.params.id);
    res.status(200).send("Suppression réussie");
  } catch (error) {
    console.error("Erreur lors de la suppression du post :", error);
    res.status(500).send("Erreur lors de la suppression du post");
  }
};
