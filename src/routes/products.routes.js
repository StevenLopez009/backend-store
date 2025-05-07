import { Router } from "express";
import {
  getProducts,
  getProduct,
  createProduct,
  updateProductStock,
} from "../controllers/products.controller.js";

const router = Router();

router.get("/products", getProducts);
router.get("/products/:id", getProduct);
router.post("/products", createProduct);
router.post("/products/update-stock", updateProductStock);

export default router;
