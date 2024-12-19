const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Crear producto
router.post('/', async (req, res) => {
  const { name, price, description, image } = req.body;

  try {
    const newProduct = new Product({ name, price, description, image });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear producto', error });
  }
});

// Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener productos', error });
  }
});

// Borrar un producto por su ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.status(200).json({ message: 'Producto eliminado', product: deletedProduct });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar producto', error });
  }
});

module.exports = router;
