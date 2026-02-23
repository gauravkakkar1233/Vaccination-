import express from 'express';
import connectDb from './config/db.js';
import authRouter from './routes/authRouter.js';
import adminRouter from './routes/adminRouter.js';
import userRouter from './routes/userRouter.js';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
    res.send("Maternal Health Care API Running ");
});

connectDb().then(
    () => {
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Server Started at port ${PORT} (accessible from network)`);
        })
    }
).catch((err) => {
    console.log("Error in starting the server." + err)
})