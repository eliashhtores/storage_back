const express = require('express')
const router = express.Router()
const fileUpload = require('express-fileupload')
const app = express()

app.use(fileUpload())

router.post('/', function (req, res) {
    console.log(req.files)
})

module.exports = router