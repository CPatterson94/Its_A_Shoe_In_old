const express = require("express");
const { client } = require("./db");
const authRoutes = require("../auth/auth");

const app = express();
app.use(express.json());
client.connect();

app.use("/api/auth", authRoutes);
app.use("/api/users", require("./users"));
app.use("/api/products", require("./products"));
app.use("/api/cart", require("./cart"));
app.use("/api/orders", require("./orders"));

app.listen(8080, () => {
  console.log("App is running at port 8080");
});
