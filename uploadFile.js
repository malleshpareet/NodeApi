const multer = require('multer');
const { categoryStorage, productStorage, posterStorage } = require('./cloudinaryConfig');

// Create multer instances with Cloudinary storage
// We'll let Cloudinary handle file type validation
const uploadCategory = multer({
  storage: categoryStorage,
  limits: {
    fileSize: 1024 * 1024 * 5 // limit filesize to 5MB
  }
});

const uploadProduct = multer({
  storage: productStorage,
  limits: {
    fileSize: 1024 * 1024 * 5 // limit filesize to 5MB
  }
});

const uploadPosters = multer({
  storage: posterStorage,
  limits: {
    fileSize: 1024 * 1024 * 5 // limit filesize to 5MB
  }
});

module.exports = {
    uploadCategory,
    uploadProduct,
    uploadPosters,
};