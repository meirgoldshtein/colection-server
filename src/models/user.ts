import { Document, model, ObjectId, Schema, Types } from "mongoose";

export interface IUser extends Document {
    username: string,
    password: string,
    isAdmin: boolean,
    hasVoted: boolean,
    votedFor: ObjectId | null
}

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        index: true,
        lowercase: true,
        trim: true,
        minLength: [3, "Username must be at least 3 characters long"],
        maxLength: [20, "Username must be at most 20 characters long"]
    },
    password: { type: String, required: true },
    isAdmin: {
        type: Boolean,
        default: false
    },
    hasVoted: {
        type: Boolean,
        default: false
    },
    votedFor: {
        type: Types.ObjectId,
        ref: "Candidate",
        default: null
    }
})

export default model<IUser>("User", userSchema);