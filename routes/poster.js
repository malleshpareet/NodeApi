const express = require('express');
const router = express.Router();
const Poster = require('../model/poster');
const { uploadPosters } = require('../uploadFile');
const asyncHandler = require('express-async-handler');

// Get all posters
router.get('/', asyncHandler(async (req, res) => {
    try {
        const posters = await Poster.find({});
        res.json({ success: true, message: "Posters retrieved successfully.", data: posters });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}));

// Get a poster by ID
router.get('/:id', asyncHandler(async (req, res) => {
    try {
        const posterID = req.params.id;
        const poster = await Poster.findById(posterID);
        if (!poster) {
            return res.status(404).json({ success: false, message: "Poster not found." });
        }
        res.json({ success: true, message: "Poster retrieved successfully.", data: poster });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}));

// Create a new poster
router.post('/', asyncHandler(async (req, res) => {
    try {
        uploadPosters.single('img')(req, res, async function (err) {
            if (err) {
                console.log(`Add poster: ${err}`);
                return res.status(400).json({ success: false, message: err.message || "Error uploading file" });
            }
            const { posterName } = req.body;
            let imageUrl = 'no_url';
            if (req.file) {
                imageUrl = req.file.path;
            }

            if (!posterName) {
                return res.status(400).json({ success: false, message: "Name is required." });
            }

            try {
                const newPoster = new Poster({
                    posterName: posterName,
                    imageUrl: imageUrl
                });
                await newPoster.save();
                res.json({ success: true, message: "Poster created successfully.", data: null });
            } catch (error) {
                console.error("Error creating Poster:", error);
                res.status(500).json({ success: false, message: error.message });
            }
        });
    } catch (err) {
        console.log(`Error creating Poster: ${err.message}`);
        return res.status(500).json({ success: false, message: err.message });
    }
}));

// Update a poster
router.put('/:id', asyncHandler(async (req, res) => {
    try {
        const posterID = req.params.id;
        uploadPosters.single('img')(req, res, async function (err) {
            if (err) {
                console.log(`Update poster: ${err.message}`);
                return res.status(400).json({ success: false, message: err.message || "Error uploading file" });
            }

            const { posterName } = req.body;
            let image = req.body.image;

            if (req.file) {
                image = req.file.path;
            }

            if (!posterName) {
                return res.status(400).json({ success: false, message: "Name is required." });
            }

            try {
                const updatedPoster = await Poster.findByIdAndUpdate(posterID, { posterName: posterName, imageUrl: image }, { new: true });
                if (!updatedPoster) {
                    return res.status(404).json({ success: false, message: "Poster not found." });
                }
                res.json({ success: true, message: "Poster updated successfully.", data: null });
            } catch (error) {
                res.status(500).json({ success: false, message: error.message });
            }
        });
    } catch (err) {
        console.log(`Error updating poster: ${err.message}`);
        return res.status(500).json({ success: false, message: err.message });
    }
}));

// Delete a poster
router.delete('/:id', asyncHandler(async (req, res) => {
    const posterID = req.params.id;
    try {
        const deletedPoster = await Poster.findByIdAndDelete(posterID);
        if (!deletedPoster) {
            return res.status(404).json({ success: false, message: "Poster not found." });
        }
        res.json({ success: true, message: "Poster deleted successfully." });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}));

module.exports = router;