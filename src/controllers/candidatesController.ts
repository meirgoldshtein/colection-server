import { Request, Response } from "express";
import { getCandidatesService, initDatabase, voteForCandidateService } from "../services/candidates";
import { userVoteService } from "../services/users";
import { io } from "../app";

export const seed = async (req: Request, res: Response) => {
    try {
        await initDatabase();
        res.status(201).json({ message: "Database seeded successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error seeding database" + error });
    }
}

export const getCandidates = async (req: Request, res: Response) => {
    try {
        const candidates = await getCandidatesService();
        res.status(200).json(candidates);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error getting candidates" + error });
    }
}

export const voteForCandidate = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user_id = (req as any).user.user_id
        await voteForCandidateService(user_id, id);        
        await userVoteService(user_id, id);
        res.status(200).json({ message: "Candidate voted successfully" });
        io.emit('voteUpdate', await getCandidatesService());
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error voting for candidate" + error });
    }
}
