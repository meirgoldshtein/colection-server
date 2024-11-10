import { Request, Response } from "express";
import { getCandidatesService, initDatabase } from "../services/candidates";

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

