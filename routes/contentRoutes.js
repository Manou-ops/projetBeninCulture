const express = require('express');
const { createContent, getContents, getContentById, updateContent, deleteContent } = require('../controllers/contentControlleur');
const { authenticate } = require('../midleware/auth');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Contents
 *   description: Gestion des contenus
 */

/**
 * @swagger
 * /api/contents:
 *   post:
 *     summary: Créer un nouveau contenu
 *     tags: [Contents]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               fileUrl:
 *                 type: string
 *               type:
 *                 type: string
 *               genre:
 *                 type: string
 *     responses:
 *       201:
 *         description: Contenu créé avec succès
 *       400:
 *         description: Erreur lors de la création du contenu
 */
router.post('/', authenticate, createContent);

/**
 * @swagger
 * /api/contents:
 *   get:
 *     summary: Récupérer tous les contenus
 *     tags: [Contents]
 *     responses:
 *       200:
 *         description: Liste des contenus
 *       500:
 *         description: Erreur serveur
 */
router.get('/', getContents);

/**
 * @swagger
 * /api/contents/{id}:
 *   get:
 *     summary: Récupérer un contenu spécifique par ID
 *     tags: [Contents]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du contenu
 *     responses:
 *       200:
 *         description: Contenu récupéré avec succès
 *       404:
 *         description: Contenu non trouvé
 */
router.get('/:id', getContentById);

/**
 * @swagger
 * /api/contents/{id}:
 *   put:
 *     summary: Mettre à jour un contenu spécifique par ID
 *     tags: [Contents]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du contenu
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               fileUrl:
 *                 type: string
 *               type:
 *                 type: string
 *               genre:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contenu mis à jour avec succès
 *       404:
 *         description: Contenu non trouvé
 */
router.put('/:id', authenticate, updateContent);

/**
 * @swagger
 * /api/contents/{id}:
 *   delete:
 *     summary: Supprimer un contenu spécifique par ID
 *     tags: [Contents]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du contenu
 *     responses:
 *       200:
 *         description: Contenu supprimé avec succès
 *       404:
 *         description: Contenu non trouvé
 */
router.delete('/:id', authenticate, deleteContent);

module.exports = router;