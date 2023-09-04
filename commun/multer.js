const multer = require("multer");
const path = require("path");
const fs = require('fs')
const { promisify } = require('util')

const deletefile = promisify(fs.unlink)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        const newFileName = Date.now() + path.extname(file.originalname);
        cb(null, newFileName);
    }
});

function fileFilter(req, file, cb) {
    const filetypes = /jpeg|jpg|png|gif|webp|jiff/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
    }
}

// inside multer({}), file upto only 1MB can be uploaded
const uploadImage = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 100000000 }
});

module.exports = { uploadImage, deletefile };