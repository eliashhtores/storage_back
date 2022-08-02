const express = require('express')
const router = express.Router()
const app = express()
const pool = require('../database/db')

app.use(express.json())

// Get all users
router.get('/', async (req, res) => {
    try {
        const users =
            await pool.query(`SELECT us.id, name, username, description, active
            FROM user us
            JOIN role ro ON (ro.id = us.role_id)
            WHERE active`)
        res.json(users[0])
    } catch (error) {
        res.status(500).json({ message: error.message })
        console.error(error.message)
    }
})

router.post('/', (req, res) => {
    res.send('POST request to users path')
})

// Validate user
router.post('/validate', async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await pool.query('SELECT id, role_id, username, name FROM user WHERE username = ? AND password = MD5(?) AND active', [username, password])

        if (user[0].length == 0) {
            res.status(404).json({ 'message': 'User not found', 'status': 404 })
            return
        }

        res.json(user[0][0])
    } catch (error) {
        res.status(500).json({ message: error.message, status: 500 })
        console.error(error.message)
    }
})

module.exports = router