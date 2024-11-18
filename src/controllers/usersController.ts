import e, { Request, Response } from "express";
import { loginUserService, registerUser } from "../services/users";
import { CustomError } from "../types/errors";
import user from "../models/user";

export const login = async (req: Request, res: Response) => {
    try {
        const user = await loginUserService(req.body)
        if (user.success) {
            res.status(user.status).json(user)
        }
    } catch (error: CustomError | any) {
        console.log(error)
        res.status(error.status || 500).json(error.message)
    }
}

export const register = async (req: Request, res: Response) => {
    try {        
        const user = await registerUser(req.body)
        if (user.success) {
            res.status(user.status).json(user)
        }
        else {
            res.status(user.status).json(user)
        }
    } catch (error: CustomError | any) {
        console.log(error)
        res.status(error.status || 500).json(error.message)
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        if (!id || id != (req as any).user.user_id) {
            throw new Error("invalid id")
        }
        await user.deleteOne({ _id: id })
        res.status(200).json({ message: "User deleted successfully" })
    } catch (error) {
        res.status(500).json({ message: "Error deleting user" + error })
    }
}