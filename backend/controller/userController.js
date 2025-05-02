import users from "../model/userModel.js";

export const createUser = async (req, res) => {
    try {
        const userData = new users(req.body);
        const { email } = userData;
        const existingUser = await users.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const user = await userData.save();
        return res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }


}


export const fetch = async (req, res) => {
    try {
        const user = await users.find();
        if (!user) {
            return res.status(404).json({ message: "No user found" });
        }
        return res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const userExists = await users.findById({ _id: id });
        if (!userExists) {
            return res.status(404).json({ message: "User not found" });
        }
        const updatedUser = await users.findByIdAndUpdate(id, req.body, { new: true });
        return res.status(201).json(updatedUser);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const userExists = await users.findById({ _id: id });
        if (!userExists) {
            return res.status(404).json({ message: "User not found" });
        }
        await users.findByIdAndDelete(id);
        return res.status(201).json({ message: "User deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}