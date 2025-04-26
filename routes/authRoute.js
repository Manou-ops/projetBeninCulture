const express = require('express');
const { register, login, getMe, updateMe } = require('../controllers/authController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Gestion des utilisateurs (inscription et connexion)
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Inscription d'un utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       201:
 *         description: Utilisateur inscrit avec succès
 *       400:
 *         description: Erreur lors de l'inscription
 */
router.post('/register', register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Connexion d'un utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Connexion réussie
 *       401:
 *         description: Identifiants invalides
 */
router.post('/login', login);


/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Obtenir les informations de l'utilisateur connecté
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Informations utilisateur récupérées
 *       401:
 *         description: Non autorisé
 */
router.get('/me', getMe);

/**
 * @swagger
 * /api/auth/me:
 *   put:
 *     summary: Mettre à jour les informations de l'utilisateur connecté
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bio:
 *                 type: string
 *               socialLinks:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Informations utilisateur mises à jour
 *       400:
 *         description: Erreur lors de la mise à jour
 */
router.put('/me', updateMe);


module.exports = router;