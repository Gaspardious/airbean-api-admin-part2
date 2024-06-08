import database from "../database/database.js";
import crypto from "crypto";

// Hash function for password
const hashPassword = (password) => {
    return crypto.createHash("sha256").update(password).digest("hex");
  };

const adminLogin = async (req, res) => {
    const { username, password } = req.body;
    try {
      // Retrieve the user from the database based on email address
      const user = await database.customers.findOne({ username });
      if (!user) {
        console.log("User not found for username:", username);
        return res.status(400).json({ error: "Invalid username" });
      }
      const hashedPassword = hashPassword(password);
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
  
  export { adminLogin };