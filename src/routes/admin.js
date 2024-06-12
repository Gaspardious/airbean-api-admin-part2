import { Router } from "express";
import { adminLogin } from "../controller/adminLogin.js"
import { adminRegister } from "../controller/adminLogin.js"
import { getAllProducts } from "../controller/menu.js"
import { addToMenu } from "../controller/adminMenu.js"
import { deleteItemInMenu } from "../controller/adminMenu.js"
import { updateMenu } from "../controller/adminMenu.js"
import { adminAuthenticate } from "../middleware/auth.js";
import { addToCampaign } from "../controller/adminMenu.js"
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
router.post('/addToCampaign', adminAuthenticate, checkMenuItemExists, async (req, res) => {
  const { items } = req.body; // expecting an array of item IDs in the body

  if (!Array.isArray(items) || items.length < 2) {
    res.status(400).send({ error: 'At least two items are required to create a campaign' });
    return;
  }

  console.log('Received items:', items);

  addToCampaign(items, (err, campaign) => {
    if (err) {
      res.status(500).send({ error: 'Failed to create campaign' });
      return;
    }

    res.status(201).send(campaign);
  });
});


export default router;