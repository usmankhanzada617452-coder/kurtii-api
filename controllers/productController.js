const Product = require("../models/Product");
const CATEGORIES = require("../config/categories");
const validCategoryNames = CATEGORIES.map((c) => c.name);

// Sare products laao
// GET /api/products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Ek single product laao (ID se)
// GET /api/products/:id
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Naya product add karo
// POST /api/products
const createProduct = async (req, res) => {
  try {
    if (!validCategoryNames.includes(req.body.category)) {
      return res.status(400).json({
        success: false,
        message: `Invalid category. Allowed: ${validCategoryNames.join(", ")}`,
      });
    }

    const product = await Product.create(req.body);
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Product update karo
// PUT /api/products/:id
const updateProduct = async (req, res) => {
  try {
    if (req.body.category && !validCategoryNames.includes(req.body.category)) {
      return res.status(400).json({
        success: false,
        message: `Invalid category. Allowed: ${validCategoryNames.join(", ")}`,
      });
    }

    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // updated wala data wapas bhejo
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Product delete karo
// DELETE /api/products/:id
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};