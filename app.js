const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
// const authJwt = require("./helpers/jwt");
require("dotenv/config");

app.use(cors());
app.options("*", cors());

mongoose.set("strictQuery", true);
app.use(express.json());
app.use(morgan("tiny"));
// app.use(authJwt)

const categoriesRoutes = require("./routes/categories");
const productsRoutes = require("./routes/products");
const usersRoutes = require("./routes/users");
const ordersRoutes = require("./routes/orders");
const ordersitemsRoutes = require("./routes/orderitems");

app.use("/categories", categoriesRoutes);
app.use("/products", productsRoutes);
app.use("/users", usersRoutes);
app.use("/orders",ordersRoutes);
app.use("/orderitems",ordersitemsRoutes);

//Database
mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connection is ready...");
  })
  .catch((err) => {
    console.log(err);
  });

//Server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server is running http://localhost:${PORT}`);
});








