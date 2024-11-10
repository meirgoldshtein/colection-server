import { Router } from "express";
import { getCandidates, seed } from "../controllers/candidatesController";

const router = Router();
router.post("/seed", seed);
router.get("/", getCandidates);

export default router;