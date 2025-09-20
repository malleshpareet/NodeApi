const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Create storage engine for categories
const categoryStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'categories',
    allowed_formats: ['jpg', 'png', 'jpeg']
  }
});

// Create storage engine for products
const productStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'products',
    allowed_formats: ['jpg', 'png', 'jpeg']
  }
});

// Create storage engine for posters
const posterStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'posters',
    allowed_formats: ['jpg', 'png', 'jpeg']
  }
});

module.exports = {
  cloudinary,
  categoryStorage,
  productStorage,
  posterStorage
};