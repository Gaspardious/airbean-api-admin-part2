import { Router } from "express";
import { adminLogin, adminRegister } from "../controller/adminLogin.js";
import { getAllProducts } from "../controller/menu.js";
import { addToMenu, addToCampaign, updateMenu, deleteItemInMenu } from "../controller/adminMenu.js";
import { adminAuthenticate } from "../middleware/auth.js";
import checkMenuItemExists from "../middleware/checkMenuItemExists.js";

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
router.get("/menu",adminAuthenticate, getAllProducts);

// localhost:8000/admin/menu/items (add menu items to the menu)
router.post("/menu/items",adminAuthenticate, addToMenu);

// localhost:8000/admin/menu/items (delete menu items from the menu)
router.delete("/menu/items",adminAuthenticate, deleteItemInMenu);

// localhost:8000/admin/menu/items (update menu items in the menu)
router.put("/menu/items",adminAuthenticate, updateMenu);

// localhost:8000/admin/menu/items (add items to campaign)
router.post('/menu/addToCampaign', adminAuthenticate, checkMenuItemExists, addToCampaign);

export default router;