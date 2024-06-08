import database from "../database/database.js";
import crypto from "crypto";

// Hash function for password
const hashPassword = (password) => {
    return crypto.createHash("sha256").update(password).digest("hex");
};

const adminRegister = async (req, res) => {
    const { username, password, email, phone } = req.body;

    if (!email || !username || !password) {
        return res.status(400).json({ error: "Email, username, and password are required" });
    }

    // Check if the email already exists
    const existingEmail = await database.admin.findOne({ email });
    if (existingEmail) {
      console.log("Email already in use:", email);
      return res.status(400).json({ error: "Email already in use" });
    }

    // Check if the username already exists
    const existingUsername = await database.admin.findOne({ username });
    if (existingUsername) {
      console.log("Username already in use:", username);
      return res.status(400).json({ error: "Username already in use" });
    }

    try {
        // Hash the password before storing it
        const hashedPassword = hashPassword(password);
        
        // Create a new user object
        const newUser = {
            username,
            password: hashedPassword,
            email,
            phone,
        };

        // Save the new user to the database
        const savedUser = await database.admin.insertOne(newUser);

        console.log("User registered successfully:", savedUser);
        res.status(201).json({ message: "User registered successfully", user: savedUser });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ error: "Failed to register user" });
    }
};


const adminLogin = async (req, res) => {
    const { username, password } = req.body;
    console.log("Received login request for username:", username);
    try {
        // Retrieve the user from the database based on username
        const user = await database.admin.findOne({ username });
        if (!user) {
            console.log("User not found for username:", username);
            return res.status(400).json({ error: "Invalid username" });
        }
        const hashedPassword = hashPassword(password);
        console.log("Hashed input password:", hashedPassword);
        console.log("Stored hashed password:", user.password);
        if (hashedPassword !== user.password) {
            console.log("Invalid password for user:", username);
            return res.status(400).json({ error: "Invalid password" });
        }
        console.log("User logged in successfully:", user.username);
        global.currentUser = user.username;
        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ error: "Failed to login user" });
    }
};




export { adminLogin, adminRegister };


