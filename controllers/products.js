const Product = require("../models/Product");

const getAllProducts = async (req, res) => {
  // #swagger.tags = ['Products']
  // #swagger.description = 'Retrieve all products from the database'
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingleProduct = async (req, res) => {
  // #swagger.tags = ['Products']
  // #swagger.description = 'Retrieve a single product by its ID'
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createProduct = async (req, res) => {
  /*  #swagger.tags = ['Products']
      #swagger.description = 'Endpoint to create a new bowl or dish'
      #swagger.parameters['obj'] = {
          in: 'body',
          description: 'Product data',
          schema: {
              $name: 'Purple Power Bowl',
              $ingredients: 'Acai, Blueberries, Granola, Almond Butter',
              $price: 15.90,
              $image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733',
              category: 'Premium Bowl',
              calories: 520,
              available: true,
              isVegan: true
          }
      } */
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateProduct = async (req, res) => {
  /*  #swagger.tags = ['Products']
      #swagger.description = 'Update an existing product by its ID'
      #swagger.parameters['obj'] = {
          in: 'body',
          description: 'Partial or full product data',
          schema: {
              price: 16.50,
              available: false
          }
      } */
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteProduct = async (req, res) => {
  // #swagger.tags = ['Products']
  // #swagger.description = 'Delete a product from the database permanently'
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllProducts, getSingleProduct, createProduct, updateProduct, deleteProduct };