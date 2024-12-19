const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Registrar usuario
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).json({ message: 'Usuario registrado con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar usuario', error });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });
    if (user) {
      res.status(200).json({ message: 'Login exitoso', user });
    } else {
      res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión', error });
  }
});

module.exports = router;
