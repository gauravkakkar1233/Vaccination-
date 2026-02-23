import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config({ path: "../../.env" });

const connectDb = async () => {
    try {
        const url = process.env.MONGODB_URL;

        if (!url) {
            throw new Error("MONGODB_URL not found in .env");
        }

        await mongoose.connect(url);
        console.log("DB Connected Successfully");
    } catch (err) {
        console.log("Error connecting to DB:", err.message);
        process.exit(1);
    }
}

export default connectDb;
