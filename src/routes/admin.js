import { Router } from "express";
import { adminLogin } from "../controller/admin.js"

const router = Router();


// localhost:8000/admin
router.get("/", async (req, res) => {
    res.json({ message: "Welcome to the admin page" });
  });

// localhost:8000/admin/login
router.post("/login", adminLogin);




export default router;