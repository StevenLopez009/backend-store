import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import productRoutes from "./routes/products.routes.js";
import favoriteRoutes from "./routes/favorite.routes.js";
import imagesRoutes from "./routes/image.route.js";
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use("/api", authRoutes);
app.use("/api", productRoutes);
app.use("/api", favoriteRoutes);
app.use("/api", imagesRoutes);

export default app;
