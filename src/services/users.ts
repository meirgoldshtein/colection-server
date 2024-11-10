import user from "../models/user";
import { CustomError } from "../types/errors";
import newUserDto from "../types/newUserDto";
import bcrypt from "bcrypt"

export const registerUser = async (userGet: newUserDto) => {
    try {
        const { username, password } = userGet
        if (!username || !password) {
            console.log(username, password);
            throw new CustomError(
                "Username and password are required",
                400      
            )
        }
        //check if user exists
        const userExists = await user.findOne({ username })
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
        return {success: true, data: newUser.username, message: "User created successfully", status: 201}
    } catch (error) {
        console.log(error);
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
        const userExists = await user.findOne({ username })
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
        return {success: true, data: userExists.username, message: "User logged in successfully", status: 200}
    } catch (error) {
        throw error
    }
}