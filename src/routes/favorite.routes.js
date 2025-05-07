import { Router } from "express";
import {
  createFavorite,
  deleteFavorite,
  getFavorites,
} from "../controllers/favorites.controller.js";

const router = Router();

router.post("/favorites", createFavorite);
router.get("/favorites/:userId", getFavorites);
router.delete("/favorites", deleteFavorite);

export default router;
