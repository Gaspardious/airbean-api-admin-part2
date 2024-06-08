import { Router } from "express";
import { adminLogin } from "../controller/adminLogin.js"
import { adminRegister } from "../controller/adminLogin.js"
import { getAllProducts } from "../controller/menu.js"
import { addToMenu } from "../controller/adminMenu.js"
import { deleteItemInMenu } from "../controller/adminMenu.js"


const router = Router();


// localhost:8000/admin
router.get("/", async (req, res) => {
    res.json({ message: "Welcome to the admin page" });
  });

// localhost:8000/admin/login
router.post("/login", adminLogin);

// localhost:8000/admin/register
router.post("/register", adminRegister);

// localhost:8000/admin/menu (get all menu items)
router.get("/menu", getAllProducts);

// localhost:8000/admin/menu/items (add menu items to the menu)
router.post("/menu/items", addToMenu);

// localhost:8000/admin/menu/items (delete menu items from the menu)
router.delete("/menu/items", deleteItemInMenu);








export default router;