import { Router } from "express";
import { adminLogin } from "../controller/admin.js"
import { adminRegister } from "../controller/admin.js"


const router = Router();


// localhost:8000/admin
router.get("/", async (req, res) => {
    res.json({ message: "Welcome to the admin page" });
  });

// localhost:8000/admin/login
router.post("/login", adminLogin);


// localhost:8000/admin/register
router.post("/register", adminRegister);




export default router;