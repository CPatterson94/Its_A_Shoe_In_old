const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { addUser, getUserByUsername } = require('./db');
const router = express.Router();

const saltRounds = 10;
const jwtSecret = 'Whitegyalshoes'; // we can change the secure key if ya dont like it

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = await addUser({ username, password: hashedPassword });
        res.status(201).json(newUser);
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ error: "Error registering user" });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await getUserByUsername(username);
        if (!user) {
            return res.status(401).json({ error: "Invalid username or password" });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: "Invalid username or password" });
        }

        const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ error: "Error logging in" });
    }
});

module.exports = router;
