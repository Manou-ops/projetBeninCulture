const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, role });
    await user.save();
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: 'User not found!' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials!' });
   
    const token = jwt.sign({ id: user._id, role: user.role }, 'secretKey', { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}; 

exports.getMe = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, 'secretKey'); // Utilise la même clé que lors du login

    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ message: 'Token invalide' });
  }
};

exports.updateMe = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, 'secretKey');

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Mise à jour autorisée seulement sur certains champs
    if (req.body.bio !== undefined) {
      user.bio = req.body.bio;
    }
    if (req.body.socialLinks !== undefined) {
      user.socialLinks = req.body.socialLinks;
    }

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};