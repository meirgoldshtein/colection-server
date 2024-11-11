import { Router } from "express";
import { getCandidates, seed, voteForCandidate } from "../controllers/candidatesController";
import verifyUser from "../middlewares/verifyUser";

const router = Router();
router.post("/seed", seed);
router.get("/", verifyUser ,getCandidates);
router.post("/vote/:id", verifyUser, voteForCandidate);
export default router;