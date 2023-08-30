const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
// const { uploadFile } = require("../utils/s3");


const signinController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password) return res.status(400).send({ success: false, message: 'Please provide all data' });
        const user = await User.findOne({ email });
        
        if(!user) return res.status(404).send({ success: false, message: 'User not found' });

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if(!isPasswordMatch) return res.status(400).send({ success: false, message: 'Credential does not match' });

        const token = await user.generateAuthToken();
        if (!token) {
            return res.status(500).send({ error: "Can't Login at this time" });
        }
        // res.cookie("token", token);
        
        return res.status(500).send({ success: true, message: 'Successfully Login', data: { ...user.toJSON(), token, } });
    } catch (error) {
        return res.status(200).send({ success: false, error: error.message });
    }
}

const signupController = async (req, res) => {
    try {
        const { first_name, last_name, email, password, phone, username, gender } = req.body;
        let fileName = null;

        if(!first_name || !last_name || !username || !gender || !phone || !email || !password) {
            return res.status(400).send({ success: false, message: 'Please provide all data' });
        }

        if (req.file) {
            fileName = Date.now() + '-' + req.file.originalname;
            // avatar = await uploadFile(req.file, fileName)
        }

        const user = new User({ first_name, last_name, email, password, phone, username, gender, dp_url: fileName });
        await user.save();
        return res.status(200).send({ success: true, message: 'Successfully Signup', data: user.toJSON() });
    } catch (error) {
        let message;
        if ((error.keyPattern && error.keyPattern.email == 1) && (error.keyValue && error.keyValue.email !== "")) {
            message = "Email already exist.";
        }
        else if (error._message) {
            message = "Please enter valid data";
        }

        console.log(error);
        return res.send({ success: false, message });
    }
}

const logoutUser = (req, res) => {
    res.clearCookie("token");
    return res.status(200).send({ success: true, message: "Successfully Logout" });
}

module.exports = {
    signinController,
    signupController,
    logoutUser,
}