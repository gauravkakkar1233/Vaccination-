import User from "../models/user.js";
import Vaccine from "../models/masterVaccine.js";
import UserVaccine from "../models/userVaccine.js";

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ role: "user" }).select("-password");
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: "Error fetching users: " + err.message });
    }
};

const registerChild = async (req, res) => {
    try {
        const { userId, babyName, dateOfBirth } = req.body;

        if (!userId || !babyName || !dateOfBirth) {
            return res.status(400).json({ message: "userId, babyName and dateOfBirth are required" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const defaultVaccines = await Vaccine.find({ isDefault: true });
        const dob = new Date(dateOfBirth);

        const userVaccines = defaultVaccines.map((vaccine) => {
            const scheduledDate = new Date(dob);
            scheduledDate.setDate(dob.getDate() + vaccine.ageInWeeks * 7);
            return {
                user: userId,
                babyName,
                dateOfBirth: dob,
                vaccine: vaccine._id,
                scheduledDate,
                status: "Pending",
            };
        });

        await UserVaccine.insertMany(userVaccines);

        res.status(201).json({
            message: `Child ${babyName} registered and ${userVaccines.length} vaccines scheduled successfully`,
            babyName,
            vaccinesCount: userVaccines.length,
        });
    } catch (err) {
        res.status(500).json({ message: "Error registering child: " + err.message });
    }
};

const getPendingVaccinesForComingMonth = async (req, res) => {
    try {
        const { userId, babyName } = req.body;

        if (!userId || !babyName) {
            return res.status(400).json({ message: "userId and babyName are required" });
        }

        const now = new Date();
        const nextMonth = new Date();
        nextMonth.setDate(now.getDate() + 30);

        const pendingVaccines = await UserVaccine.find({
            user: userId,
            babyName,
            status: "Pending",
            scheduledDate: { $gte: now, $lte: nextMonth },
        }).populate("vaccine");

        res.status(200).json({
            count: pendingVaccines.length,
            vaccines: pendingVaccines,
        });
    } catch (err) {
        res.status(500).json({ message: "Error fetching pending vaccines: " + err.message });
    }
};

export { getAllUsers, registerChild, getPendingVaccinesForComingMonth };
