const bcrypt = require('bcryptjs');
const User = require('../models/userModel')
const generateToken = require('../utils/generateToken');

async function register(req, res) {
    console.log('++++++++++++++++++++++++===:', req.body)
    try {
        const {
            name,
            email,
            password
        } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: 'User already exists'
            });
        }

        const hashedPassword = await bcrypt.hash(
            password,
            10
        );

        const user = {
            name,
            email,
            password: hashedPassword,
            createdAt: new Date()
        };

        const result = await User.insertOne(user);
        res.status(201).json({
            message: 'User registered',
            result
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
}

async function login(req, res) {

    try {
        const {
            email,
            password
        } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: 'Invalid email'
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                message: 'Invalid password'
            });
        }

        const token = generateToken(user);
        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

module.exports = {
    register,
    login
};