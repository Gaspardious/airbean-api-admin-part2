import express from "express";
import cartRouter from "./src/routes/cart.js";
import customerRouter from "./src/routes/customer.js";
import ordersRouter from "./src/routes/orders.js";
import companyRouter from "./src/routes/info.js"
import loggerMiddleware from "./src/middleware/logger.js";
import errorHandlerMiddleware from "./src/middleware/errorHandler.js";
import notFoundMiddleware from "./src/middleware/notFound.js";
import adminRouter from "./src/routes/admin.js";

const PORT = 8000;

const app = express();
global.currentUser = '';

app.use(express.json());
app.use(loggerMiddleware);

app.use("/cart", cartRouter);
app.use("/info", companyRouter);
app.use("/customer", customerRouter);
app.use("/orders", ordersRouter);
app.use("/company", companyRouter);
app.use("/admin", adminRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// db['cart'].find();
// db['menu'].find();
// db['orders'].find();
// db['users'].find();
// db['company'].find();
// db['admin'].find();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
