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