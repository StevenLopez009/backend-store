import { Router } from "express";
import multer from "multer";
import fs from "fs";
import { getImage } from "../controllers/image.controller.js";

const router = Router();
const upload = multer({ dest: "src/uploads/" });

router.get("/images/:userId", getImage);

router.post("/images", upload.single("imageProfile"), (req, res) => {
  try {
    const { userId } = req.body; 
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const filePath = saveImage(req.file, userId); 
    res.status(200).json({ message: "Image uploaded successfully", filePath });
  } catch (error) {
    console.error("Error saving image:", error);
    res.status(500).json({ message: "Failed to upload image" });
  }
});


function saveImage(file, userId) {
  const newPath = `./src/uploads/${userId}.jpg`;
  fs.renameSync(file.path, newPath);
  return `/uploads/${userId}.jpg`;
}


export default router;
