import express from "express";
import { register, login } from "../controllers/authController.js";
import { auth, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// Ruta protegida para admin
router.get("/admin", auth, admin, (req, res) => {
  res.json({ message: "Acceso concedido a admin" });
});

// Ruta protegida para usuario normal
router.get("/user", auth, (req, res) => {
  res.json({ message: "Acceso concedido a usuario" });
});

export default router;
