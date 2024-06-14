const express = require("express");
const { client } = require("./db");
const authenticateToken = require("./authenticateToken");
const authRoutes = require("./auth");

const app = express();
app.use(express.json());
client.connect();

app.use("/api/auth", authRoutes);
app.use("/api/users", authenticateToken, require("./users"));
app.use("/api/products", authenticateToken, require("./products"));
app.use("/api/cart", authenticateToken, require("./cart"));

app.listen(8080, () => {
  console.log("App is running at port 8080");
});
