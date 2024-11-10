import { Request, Response } from "express";
import { initDatabase } from "../services/candidates";

export const seed = async (req: Request, res: Response) => {
    try {
        await initDatabase();
        res.status(201).json({ message: "Database seeded successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error seeding database" });
    }
}