import candidate from "../models/candidate";
import user from "../models/user";
import { CustomError } from "../types/errors";
import newUserDto from "../types/newUserDto";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const registerUser = async (userGet: newUserDto) => {
    try {
        const { username, password } = userGet
        if (!username || !password) {
            throw new CustomError(
                "Username and password are required",
                400
            )
        }
        //check if user exists
        const userExists = await user.findOne({ username }).lean()
        if (userExists) {
            throw new CustomError(
                "User already exists",
                400
            )
        }
        // use bcrypy to hash password
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new user({ username, password: hashedPassword })
        await newUser.save()
        return { success: true, data: { ...newUser, password: '********' }, message: "User created successfully", status: 201 }
    } catch (error) {
        throw error
    }
}

export const loginUserService = async (userGet: newUserDto) => {
    try {
        const { username, password } = userGet
        if (!username || !password) {
            throw new CustomError(
                "Username and password are required",
                400
            )
        }
        //check if user exists
        const userExists = await user.findOne({ username }).lean()
        if (!userExists) {
            throw new CustomError(
                "User does not exist",
                400
            )
        }
        //check if password is correct
        const isPasswordCorrect = await bcrypt.compare(password, userExists.password)
        if (!isPasswordCorrect) {
            throw new CustomError(
                "Password is incorrect",
                400
            )
        }
        //gen token
        const token =  jwt.sign({
            user_id: userExists._id,
            isAdmin: userExists.isAdmin,
            username: userExists.username
        }, process.env.JWT_SECRET as string, { expiresIn: "20m" });
        return { success: true, data: { ...userExists, password: '********' }, message: "User logged in successfully", status: 200, token }
    } catch (error) {
        throw error
    }
}


export const userVoteService = async (user_id: string, candidate_id: string) => {
    try {
        // delete previous vote from candidate collection
        const previousVote = await user.findOne({ _id: user_id }).lean()
        if (previousVote?.votedFor) {
            await candidate.findOneAndUpdate({ _id: previousVote.votedFor }, { $inc: { votes: -1 } });
        };
        const userToUpdate = await user.findOneAndUpdate({ _id: user_id }, { $set: { hasVoted: true, votedFor: candidate_id } });
        if (!userToUpdate) {
            throw new Error("User not found");
        }
        return user;
    } catch (error) {
    }
}

