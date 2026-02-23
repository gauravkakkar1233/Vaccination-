import mongoose from "mongoose";

const userVaccineSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    babyName: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    vaccine: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vaccine",
        required: true,
    },
    scheduledDate: Date,
    status: {
        type: String,
        enum: ["Pending", "Completed", "Missed"],
        default: "Pending",
    },
    completedDate: Date,
}, { timestamps: true });

export default mongoose.model("UserVaccine", userVaccineSchema);
