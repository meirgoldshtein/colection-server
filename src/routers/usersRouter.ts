import { Router } from "express";
import { deleteUser, login, register } from "../controllers/usersController";
import verifyUser from "../middlewares/verifyUser";

const router = Router();

router.post("/login", login);

router.post("/register", register);

router.post("/logout", (req, res) => {});

router.delete("/delete/:id",verifyUser , deleteUser);

export default router;
