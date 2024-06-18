// middleware/upload.js

const multer = require('multer');

// Set up the storage and file naming
const storage = multer.diskStorage({
 filename: function (req, file, cb) {
  cb(null, Date.now() + '_' + file.originalname);
 },
});

// Define file filter
const fileFilter = (req, file, cb) => {
 if (file.mimetype.startsWith('image/')) {
  cb(null, true);
 } else {
  cb(new Error('Only image files are allowed!'), false);
 }
};

// Set up multer middleware
const upload = multer({
 storage: storage,
 fileFilter: fileFilter,
});

module.exports = upload;
