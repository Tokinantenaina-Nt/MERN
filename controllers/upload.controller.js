const multer = require("multer");
const allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png"];
const { uploadErrors } = require("../utils/errors.utils");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const uploadPath = `${__dirname}/../client/public/uploads/profil/`;
    cb(null, uploadPath);
  },
  filename: function(req, file, cb) {
    const fileName = req.body.name + ".jpg";
    if (!req.body.name) {
      return cb(new Error("Missing field: name in request body"));
    }
    cb(null, fileName);
  }
});
const upload = multer({
  storage: storage,
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

module.exports = upload;
