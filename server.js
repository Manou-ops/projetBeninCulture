
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoute');
const contentRoutes = require('./routes/contentRoutes');

dotenv.config();
const app = express();

app.use(express.json());

const uri = process.env.MONGO_URI || 'mongodb+srv://MANOUP:1234REZA@cluster0.jxw7p.mongodb.net/soundBase?retryWrites=true&w=majority';
mongoose.connect(uri)
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((err) => console.error('Erreur de connexion à MongoDB :', err));

app.use('/api/auth', authRoutes);
app.use('/api/contents', contentRoutes);   

const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


 




