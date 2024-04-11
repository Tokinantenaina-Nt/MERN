const multer = require("multer");
const path = require("path");
const allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png"];
let fileNameUser = "";

const fileName = req => {
  if (!fileNameUser && req.path.includes("upload"))
    fileNameUser = req.body.name + ".jpg";
  if (!fileNameUser && req.path === "/")
    fileNameUser = req.body.posterId + Date.now() + ".jpg";
  // else fileNameUser = "inini.jpeg";
  return fileNameUser;
};

function storagePath(folder) {
  const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      const uploadPath = path.join(
        __dirname,
        `../client/public/uploads/${folder}/`
      );
      cb(null, uploadPath);
    },
    filename: function(req, file, cb) {
      cb(null, fileName(req));
    }
  });
  return storage;
}

const uploadUser = multer({
  storage: storagePath("profil"),
  limits: {
    fileSize: 512000
  },
  fileFilter: function(req, file, cb) {
    try {
      if (!allowedMimeTypes.includes(file.mimetype))
        throw Error("File type not supported");
      cb(null, true);
    } catch (err) {
      cb(err);
    }
  }
});

const uploadPost = multer({
  storage: storagePath("posts"),
  limits: {
    fileSize: 512000
  },
  fileFilter: function(req, file, cb) {
    try {
      if (!allowedMimeTypes.includes(file.mimetype))
        throw Error("File type not supported");
      cb(null, true);
    } catch (err) {
      cb(err);
    }
  }
});

module.exports = { uploadUser, uploadPost, fileName };
