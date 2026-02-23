import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    phone: {
        type: String,
        default: null
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
    pregnancyWeek: {
        type: Number,
        default: null
    },
    expectedDeliveryDate: {
        type: Date,
        default: null
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;