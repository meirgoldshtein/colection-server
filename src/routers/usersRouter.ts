import { Router } from "express";
import { login, register } from "../controllers/usersController";

const router = Router();

router.post("/login", login);

router.post("/register", register);

router.post("/logout", (req, res) => {});

export default router;
