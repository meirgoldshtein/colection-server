import { Router } from "express";
import { seed } from "../controllers/candidatesController";

const router = Router();
router.post("/seed", seed);

export default router;