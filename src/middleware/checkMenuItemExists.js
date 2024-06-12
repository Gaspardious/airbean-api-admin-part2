import db from '../database/database.js';

const menuDb = db.menu;

const checkMenuItemExists = async (req, res, next) => {
  const { items } = req.body;

  if (!Array.isArray(items) || items.length < 2) {
    return res.status(400).send({ error: 'At least two items are required to create a campaign' });
  }

  try {
    const docs = await menuDb.find({ _id: { $in: items } });
    if (docs.length !== items.length) {
      return res.status(404).send({ error: 'One or more items do not exist in the menu' });
    }

    // Attach the retrieved items to the request object for further use
    req.menuItems = docs;
    next();
  } catch (err) {
    console.error('Error in checkItemsExist middleware:', err);
    return res.status(500).send({ error: 'Internal server error' });
  }
};

export default checkMenuItemExists;
