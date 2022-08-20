const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({
    attributes: ['id', 'category_name'],
    include: [
      {
        model: Product,
        attributes: ['product_name']
      }
    ]
  })
    .then(data => res.json(data))
    .catch(err => {
      if (err) {
        console.log(err);
        res.status(500).json(err);
      }
    });
});

router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'category_name'],
    include: [
      {
        model: Product,
        attributes: ['product_name']
      }
    ]
  })
    .then(data => {
      if (!data) {
        res.status(404).json({message: 'No matching category.'});
        return;
      }
      res.json(data);
    })
    .catch(err => {
      if (err) {
        console.log(err);
        res.status(500).json(err);
      }
    });
});

router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name
  })
    .then(data => res.json(data))
    .catch(err => {
      if(err) {
        console.log(err);
        res.status(500).json(err);
      }
    });
});

router.put('/:id', (req, res) => {
  Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      }
    })
      .then(data => {
        if (!data) {
          res.status(404).json({message: 'No matching category to update'});
          return;
        }
        res.json(data);
      })
      .catch(err => {
        if (err) {
          console.log(err);
          res.status(500).json(err);
        }
      });
});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(data => {
      if (!data) {
        res.status(404).json({message: 'No matching category found to delete'});
        return;
      }
      res.json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

module.exports = router;
