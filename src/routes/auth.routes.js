import { Router } from "express";
import { authRequired } from "../utilities/middlewares/validateToken.js";
import { validateSchema } from "../utilities/middlewares/validator.middleware.js";
import { registerSchema, loginSchema } from "../utilities/schemas/auth.schema.js";
import {register} from "../controllers/register.controller.js";
import {login} from "../controllers/login.controller.js";
import {logout} from "../controllers/logout.controller.js";
import {verifyToken} from "../controllers/verifyToken.controller.js";
import {user} from "../controllers/user.controller.js";

const router = Router();

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.post("/logout", logout);
router.get("/verify", verifyToken);
router.get("/profile", authRequired, user);

export default router;
