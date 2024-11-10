import { Document, model, ObjectId, Schema, Types } from "mongoose";

export interface ICandidate extends Document {
    name: string,
    image: string,
    votes: number,
}

const candidateSchema = new Schema<ICandidate>( {
    name: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        index: true,
        lowercase: true,
        trim: true,
        minLength: [3, "Username must be at least 3 characters long"],
        maxLength: [20, "Username must be at most 20 characters long"]
    },
    image: { type: String, required: true },
    votes: { type: Number, default: null }
})

export default model<ICandidate>("Candidate", candidateSchema);