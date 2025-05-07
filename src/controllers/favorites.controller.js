import mongoose from "mongoose";
import Favorite from "../models/favorite.model.js";
import ProductModel from "../models/product.model.js";

export const getFavorites = async (req, res) => {
  try {
    const { userId } = req.params;

    const userIdObjectId = new mongoose.Types.ObjectId(userId);

    const favorite = await Favorite.findOne({ user: userIdObjectId });

    if (!favorite) {
      return res
        .status(404)
        .json({ message: "Favorites not found for this profile" });
    }

    const productIds = favorite.products;

    const products = await ProductModel.find({ _id: { $in: productIds } });

    res.status(200).json({ products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching favorites" });
  }
};

export const createFavorite = async (req, res) => {
  try {
    const { userId, productIds } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
      return res
        .status(400)
        .json({ message: "Product IDs are required and must be an array" });
    }

    const productIdsObjectId = productIds.map(
      (productId) => new mongoose.Types.ObjectId(productId)
    );

    const existingFavorite = await Favorite.findOne({ user: userId });

    if (existingFavorite) {
      const newProducts = productIdsObjectId.filter(
        (productId) => !existingFavorite.products.includes(productId.toString())
      );

      existingFavorite.products.push(...newProducts);
      await existingFavorite.save();
      return res
        .status(200)
        .json({ message: "Products added to favorites successfully!" });
    } else {
      const newFavorite = new Favorite({
        user: userId,
        products: productIdsObjectId,
      });
      await newFavorite.save();
      return res
        .status(201)
        .json({ message: "Favorite created successfully!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating or updating favorite" });
  }
};

export const deleteFavorite = async (req, res) => {
  try {
    const { userId, productIds } = req.body; 
    if (!userId || !productIds) {
      return res.status(400).json({ message: "userId and productIds are required" });
    }
    const favorite = await Favorite.findOne({ user: userId });
    favorite.products = favorite.products.filter(
      (id) => !productIds.includes(id.toString())
    );
    await favorite.save();

    res.status(200).json({
      message: "Product removed from favorites",
      favorite,
    });
  } catch (error) {
    console.error("Error in deleteFavorite:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
