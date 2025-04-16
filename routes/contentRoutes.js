const express = require('express');
const { createContent, getContents, getContentById, updateContent, deleteContent } = require('../controllers/contentControlleur');
const { authenticate } = require('../midleware/auth');
const router = express.Router();

// Route pour créer un contenu
router.post('/', authenticate, createContent);

// Route pour récupérer tous les contenus
router.get('/', getContents);

// Route pour récupérer un contenu spécifique par ID
router.get('/:id', getContentById);

// Route pour mettre à jour un contenu spécifique par ID
router.put('/:id', authenticate, updateContent);

// Route pour supprimer un contenu spécifique par ID
router.delete('/:id', authenticate, deleteContent);

module.exports = router;