const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // Importer cors
const authRoutes = require('./routes/authRoute');
const contentRoutes = require('./routes/contentRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

dotenv.config();
const app = express();

app.use(cors()); // Activer CORS
app.use(express.json());

const uri = process.env.MONGO_URI || 'mongodb+srv://MANOUP:1234REZA@cluster0.jxw7p.mongodb.net/soundBase?retryWrites=true&w=majority';
mongoose.connect(uri)
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((err) => console.error('Erreur de connexion à MongoDB :', err));

app.use('/api/auth', authRoutes);
app.use('/api/contents', contentRoutes);

// Configuration Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Benin Culture API',
      version: '1.0.0',
      description: 'Documentation de l\'API pour le projet Benin Culture',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Serveur local',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./routes/*.js'], // Chemin vers vos fichiers de routes
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Route pour la documentation Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));







