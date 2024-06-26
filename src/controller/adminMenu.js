import db from "../database/database.js";
const menuDb = db.menu;

// Add product to menu
const addToMenu = async (req, res, next) => {
    const id = req.body.product;
    const title = req.body.title;
    const price = req.body.price;
    const desc = req.body.desc;
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const seconds = String(date.getSeconds()).padStart(2, "0");
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      };

    const newProduct = {
        id: id,
        title: title,
        price: price,
        desc: desc,
        creationDate: formatDate(new Date())
    };
    
    try {
        const result = await db["menu"].insert(newProduct);
        return res.status(200).json({ product: "Added", formatDate: newProduct.creationDate, result });
    } catch {
        return res.status(500).send({ message: "Could not update database" });
    }
    }

    // Update product in menu
        const updateMenu = async (req, res) => {
        const id = req.body.product;
        const updatedFields = {
          title: req.body.title,
          price: req.body.price,
          desc: req.body.desc,
          modifiedAt: new Date().toISOString()
        };
      
        try {
          const numAffected = await menuDb.update({ _id: id }, { $set: updatedFields }, {});
          if (numAffected === 0) {
            return res.status(404).send({ message: "Product not found" });
          }
          return res.status(200).send({ product: "Menu item updated!" });
        } catch (err) {
          console.error('Error updating menu:', err);
          return res.status(500).send({ message: "Could not update database", error: err.message });
        }
      };



// Delete product from menu
const deleteItemInMenu = async (req, res) => {
    const title = req.body.title;

    try {
        console.log("searching for item in menu with title:", title);
        const menuItem = await db["menu"].findOne({ title: title });
        console.log("THE MENU ITEM", menuItem);
        if (!menuItem) {
            return res.status(404).json({ message: "Item not found" });
        }

        const deleteMenu = await db["menu"].remove({ title: title }, {});
        console.log("Item removed", deleteMenu);

        return res.status(200).json({ message: "Item removed", deleteMenu });
    } catch (error) {
        console.error("Error removing item from menu", error);
        return res.status(500).json({ message: "Error removing item from menu", error: error.message });
    }
};
  
// Add items to campaign
const addToCampaign = async (req, res) => {
    const { items } = req.body;
    if (!Array.isArray(items) || items.length < 2) {
      res.status(400).send({ error: 'At least two items are required to create a campaign' });
      return;
    }
  
    try {
      const docs = await menuDb.find({ _id: { $in: items } });
      let campaignItems = [];
      let totalPrice = 0;

      docs.forEach(doc => {
        campaignItems.push(doc);
        totalPrice += doc.price;
      });
  
      const campaign = {
        title: "CAMPAIGN",
        items: campaignItems,
        totalPrice: totalPrice
      };
  
      const newDoc = await menuDb.insert(campaign);
      res.status(201).send(newDoc);
    } catch (err) {
      console.error('Error in addToCampaign:', err);
      res.status(500).send({ error: 'Failed to create campaign' });
    }
  };

  export { addToMenu, deleteItemInMenu, updateMenu, addToCampaign};

