const mongoose = require('mongoose');

const uri = 'mongodb+srv://MANOUP:1234REZA@cluster0.jxw7p.mongodb.net/soundBase?retryWrites=true&w=majority';

mongoose.connect(uri)  
// { useNewUrlParser: true, useUnifiedTopology: true}

.then(() => {
  console.log(' Connexion à MongoDB réussie !');
})
.catch((err) => {
  console.error(' Erreur de connexion à MongoDB :', err);
});







