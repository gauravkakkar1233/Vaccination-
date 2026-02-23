import User from "../models/user.js";
import Vaccine from "../models/masterVaccine.js";
import UserVaccine from "../models/userVaccine.js";

const registerMyChild = async (req, res) => {
    try {
        const { babyName, dateOfBirth } = req.body;
        const userId = req.user._id;

        if (!babyName || !dateOfBirth) {
            return res.status(400).json({ message: "babyName and dateOfBirth are required" });
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

const getMyChildren = async (req, res) => {
    try {
        const userId = req.user._id;
        const children = await UserVaccine.find({ user: userId })
            .distinct("babyName");
        res.status(200).json({ children });
    } catch (err) {
        res.status(500).json({ message: "Error fetching children: " + err.message });
    }
};

const getMyVaccines = async (req, res) => {
    try {
        const userId = req.user._id;
        const { babyName } = req.query;
        if (!babyName) {
            return res.status(400).json({ message: "babyName query param is required" });
        }
        const vaccines = await UserVaccine.find({ user: userId, babyName })
            .populate("vaccine")
            .sort({ scheduledDate: 1 });
        res.status(200).json({ vaccines });
    } catch (err) {
        res.status(500).json({ message: "Error fetching vaccines: " + err.message });
    }
};

export { registerMyChild, getMyChildren, getMyVaccines };
