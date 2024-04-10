const multer = require("multer");
const path = require("path");
const allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png"];
let fileNamePostPath = "";

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const uploadPath = path.join(
      __dirname,
      `../client/public/uploads/${folderName}/`
    );
    cb(null, uploadPath);
  },
  filename: function(req, file, cb) {
    cb(null, fileNamePostPath);
  }
});

const uploadUser = multer({
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

module.exports = { uploadUser };
