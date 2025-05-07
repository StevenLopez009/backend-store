import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import {createAccessToken} from "../utilities/libs/jwt.js";

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userFound = await User.findOne({ email });
        if (!userFound) return res.status(400).json({ message: "User not Found" });
        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch)
            return res.status(400).json({ message: "Incorrect Password" });

        const token = await createAccessToken({ id: userFound._id });
        res.cookie("token", token);
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
