const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.send('GET request to role path')
})

router.post('/', (req, res) => {
  res.send('POST request to role path')
})

module.exports = router