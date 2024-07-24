const User = require('../models/User.js');
const jwt = require('jsonwebtoken');
const bycrypt = require('bcryptjs');

const secretkey = process.env.SECRET_KEY;

exports.register = async (req, res) => {
    try {
        const user = new User(req.body);
        const existingUser = await User.findOne({ $or: [{ phoneNo: req.body.phoneNo }, { email: req.body.email }] });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }
        const savedUser = await user.save();
        res.status(201).json({ message: 'User created successfully', user: savedUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.login = async (req, res) => {
    try {
        const { phoneNo, password } = req.body;
        const user = await User.findOne({ phoneNo });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bycrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user._id, phoneNo: user.phoneNo, email: user.email, name: user.name }, secretkey, { expiresIn: '24h' });
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}