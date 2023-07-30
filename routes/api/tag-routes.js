const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    // Find all tags
    const tags = await Tag.findAll({
      // Include associated Product data
      include: { model: Product, through: ProductTag, as: 'products' },
    });
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    // Find a single tag by its `id`
    const tag = await Tag.findByPk(req.params.id, {
      // Include associated Product data
      include: { model: Product, through: ProductTag, as: 'products' },
    });

    // If no tag found, send 404 status
    if (!tag) {
      res.status(404).json({ message: 'Tag not found' });
      return;
    }

    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    // Create a new tag
    const tag = await Tag.create(req.body);
    res.status(201).json(tag);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    // Update a tag's name by its `id` value
    const updatedTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    // If no tag found, send 404 status
    if (!updatedTag[0]) {
      res.status(404).json({ message: 'Tag not found' });
      return;
    }

    res.status(200).json({ message: 'Tag updated successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    // Delete one tag by its `id` value
    const tag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    // If no tag found, send 404 status
    if (!tag) {
      res.status(404).json({ message: 'Tag not found' });
      return;
    }

    res.status(200).json({ message: 'Tag deleted successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
