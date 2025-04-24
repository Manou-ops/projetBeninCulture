const Content = require('../models/contentModel');

exports.createContent = async (req, res) => {
  try {
    const { title, description, fileUrl, type, genre } = req.body;
    const content = new Content({
      title,
      description,
      fileUrl,
      type,
      genre,
      createdBy: req.user.id,
    });
    await content.save();
    res.status(201).json({ message: 'Content created successfully!', content });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getContents = async (req, res) => {
  try {
    const contents = await Content.find().populate('createdBy', 'username');
    res.status(200).json(contents);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Récupérer un contenu spécifique par ID
exports.getContentById = async (req, res) => {
  try {
    const { id } = req.params;
    const content = await Content.findById(id);
    if (!content) {
      return res.status(404).json({ message: 'Contenu non trouvé' });
    }
    res.status(200).json(content);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération du contenu', error });
  }
};

// Mettre à jour un contenu spécifique par ID
exports.updateContent = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedContent = await Content.findByIdAndUpdate(id, updatedData, { new: true });
    if (!updatedContent) {
      return res.status(404).json({ message: 'Contenu non trouvé' });
    }
    res.status(200).json(updatedContent);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour du contenu', error });
  }
};

// Supprimer un contenu spécifique par ID
exports.deleteContent = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedContent = await Content.findByIdAndDelete(id);
    if (!deletedContent) {
      return res.status(404).json({ message: 'Contenu non trouvé' });
    }
    res.status(200).json({ message: 'Contenu supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression du contenu', error });
  }
}; 