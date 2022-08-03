const express = require('express')
const router = express.Router()
const path = require('path')

router.get('/', (req, res) => {
    res.status(200)
    const fs = require('fs')
    const uploads = 'uploads/'
    const files = []

    if (!fs.existsSync(uploads)) {
        fs.mkdirSync(uploads);
    }

    fs.readdirSync(uploads).forEach(file => {
        files.push(file)
    })
    res.send(files)
})

router.get('/:file', (req, res) => {
    file = req.params.file
    res.sendFile(path.join(__dirname, `../uploads/${file}`))
})


module.exports = router
