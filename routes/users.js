const express = require('express')
const router = express.Router()
const app = express()
const pool = require('../database/db')

app.use(express.json())

// Get all users
router.get('/', async (req, res) => {
    try {
        const users =
            await pool.query(`SELECT 1`)
        res.json(users[0])
    } catch (error) {
        res.status(500).json({ message: error.message })
        console.error(error.message)
    }
})

router.post('/', (req, res) => {
    res.send('POST request to role path')
})

module.exports = router