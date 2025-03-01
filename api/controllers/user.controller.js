import User from "../models/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const register = async (req, res) => {
    try {

        const { name, email, password, role } = req.body;
        if (!name || !email || !password || !role) {
            return res.status(400).json({
                success: false,
                message: "All fields are required!"
            })
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exist"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role
        });

        await newUser.save();

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                name,
                email
            }
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        })
    }
}

const login = async (req, res) => {
    try {

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required!"
            });

        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User does not exist"
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: "Invalide password"
            })
        }

        const token = jwt.sign({
            userId: user._id,
            email: user.email
        }, process.env.JWT_SECRET, { expiresIn: '24h' });

        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'None',
            maxAge: 3600 * 1000,
            path: '/',
        }

        res.cookie('token', token, options)

        return res.status(200).json({
            success: true,
            message: "Logged in successfully",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "server error",
            error: error.message,
        })
    }
}

const getMe = async (req, res) => {
    try {

        const user = req.user;
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const fetchedUser = await User.findById(user.userId);

        return res.status(200).json({
            success: true,
            message: "User fetched successfully",
            user: {
                id: fetchedUser._id,
                name: fetchedUser.name,
                email: fetchedUser.email,
                role: fetchedUser.role
            }
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "server error",
            error: error.message
        });
    }
}

const logout = async (req, res) => {
    try {
        const options = {
            httpOnly: true,
            expires: new Date(0),
            path: '/',
        }

        res.cookie('token', '', options);

        res.status(200).json({
            success: true,
            message: 'Logged out successfully'
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "server error",
            error: error.message
        })
    }
}

const getAllEmploye = async (req, res) => {
    try {
        const employees = await User.find({ role: 'employee'}).select("_id, name role");

        if (employees) {
            return res.status(200).json({
                success: true,
                message: "Fetched all employees",
                employees
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }
}

export { register, login, getMe, logout, getAllEmploye }