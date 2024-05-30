import nedb from 'nedb-promises';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, '../database/orders.db');
const ordersDB = new nedb({ filename: dbPath, autoload: true });

/*ordersDB.insert({ customerID: '111', date: "2024-05-30 18:50", products:"kaffe", quantity:4, pricePerUnit:35, _id:1111 
}); */


async function getOrderById(id) {
  return await ordersDB.findOne({ _id: id });
}

export { getOrderById };