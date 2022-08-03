const express = require('express')
const router = express.Router()
const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: 'uploads',
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage })

router.post('/', upload.single('file'), (req, res, next) => {
    try {
        res.json({
            success: true,
            message: 'File uploaded successfully',
            file: req.file
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error uploading file'
        })
    }
})

module.exports = router