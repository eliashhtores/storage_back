const express = require('express')
const router = express.Router()
const app = express()


router.post('/', function (req, res) {
    console.log(req.files)
    if (!req.files || Object.keys(req.files).length === 0)
        return res.status(400).send('No files were uploaded.')
})

module.exports = router