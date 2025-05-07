import ProductModel from "../models/product.model.js";

export const getProducts = async (req, res) => {
  const products = await ProductModel.find();
  res.json(products);
};

export const getProduct = async (req, res) => {
  const product = await ProductModel.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
};

export const createProduct = async (req, res) => {
  const { name, price, image, description, size, stock, categories } = req.body;
  const newProduct = new ProductModel({
    name,
    price,
    image,
    description,
    size,
    stock,
    categories,
  });
  const savedProduct = await newProduct.save();
  res.json(savedProduct);
};

export const updateProductStock = async (req, res) => {
  try {
    const purchaseItems = req.body;

    if (!Array.isArray(purchaseItems)) {
      return res.status(400).json({
        message: "Invalid input format. Expected an array.",
      });
    }

    const errors = [];
    const updatePromises = purchaseItems.map(async (item) => {
      try {
        const product = await ProductModel.findById(item.id);

        if (!product) {
          errors.push({ id: item.id, message: "Product not found" });
          return;
        }

        if (product.stock < item.quantity) {
          errors.push({ id: item.id, message: "Not enough stock" });
          return;
        }

        product.stock -= item.quantity;
        await product.save();
        console.log("Datos recibidos en el backend:", req.body);
      } catch {
        errors.push({ id: item.id, message: "Error processing product" });
      }
    });

    await Promise.all(updatePromises);

    if (errors.length > 0) {
      return res.status(400).json({
        message: "Some products could not be updated",
        errors,
      });
    }

    res.json({ message: "Stock updated successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error updating stock",
      error: error.message,
    });
  }
};
