const express = require('express');
const { register, login } = require('../controllers/authController');
const authRouter = express.Router();

authRouter.post('/users/register', register);
authRouter.post('/users/login', login);

module.exports = authRouter;