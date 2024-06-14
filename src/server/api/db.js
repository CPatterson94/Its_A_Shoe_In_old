const pg = require("pg");
const jwt = require('jsonwebtoken');
const jwtSecret = 'Whitegyalshoes';

const client = new pg.Client("postgres://localhost/shoe_store");

const addUser = async (user) => {
  const {name, username, password } = user;
  const token = await jwt.sign({ id: user.id }, jwtSecret);
  console.log("Token generated:", token);
  const response = await client.query(
      `INSERT INTO users (name, username, password) VALUES ($1, $2, $3) RETURNING *`,
      [name, username, password]
  );
  return response.rows[0];
};

const getUserByUsername = async (username) => {
  const response = await client.query(`SELECT * FROM users WHERE username = $1`, [username]);
  return response.rows[0];
};

//USERS
const getAllUsers = async () => {
  const response = await client.query(`SELECT * FROM users ORDER BY id ASC`);
  return response.rows;
};
const getSingleUserById = async (id) => {
  const response = await client.query(`SELECT * FROM users WHERE id = $1`, [
    id,
  ]);
  return response.rows[0];
};

//PRODUCTS
const getAllProducts = async () => {
  const response = await client.query(`SELECT * FROM products ORDER BY id ASC`);
  return response.rows;
};const getProductById = async (id) => {
  const response = await client.query(`SELECT * FROM products WHERE id = $1`, [id]);
  return response.rows[0];
};

const createProduct = async (product) => {
  const { name, price, description, category } = product;
  const response = await client.query(
    `INSERT INTO products (name, price, description, category) VALUES ($1, $2, $3, $4) RETURNING *`,
    [name, price, description, category]
  );
  return response.rows[0];
};

const updateProduct = async (id, product) => {
  const { name, price, description, category } = product;
  const response = await client.query(
    `UPDATE products SET name = $1, price = $2, description = $3, category = $4 WHERE id = $5 RETURNING *`,
    [name, price, description, category, id]
  );
  return response.rows[0];
};

const deleteProduct = async (id) => {
  await client.query(`DELETE FROM products WHERE id = $1`, [id]);
  return { id };
};

//CART
const getAllCart = async () => {
  const response = await client.query(`SELECT * FROM cart ORDER BY id ASC`);
  return response.rows;
};

const getCartByUserId = async (params_id) => {
  const cart_response = await client.query(
    `SELECT * FROM cart WHERE user_id = $1`,
    [params_id]
  );
  return {
    cart: cart_response.rows,
  };
};
const postCartByUserId = async (body) => {
  await client.query(`INSERT INTO cart(product_id, user_id) VALUES($1, $2)`, [
    body.product_id,
    body.user_id,
  ]);
  return {
    product_id: body.product_id,
    user_id: body.user_id,
  };
};
const deleteCartByUserId = async (id) => {
  await client.query(`DELETE FROM cart WHERE id = $1`, [Number(id)]);
  return {
    id: id,
  };
};

//ORDERS
const getAllOrders = async () => {
  const response = await client.query(`SELECT * FROM orders ORDER BY id ASC`);
  return response.rows;
};

const getSingleOrderById = async (id) => {
  const response = await client.query(`SELECT * FROM orders WHERE id = $1`, [
    id,
  ]);
  return response.rows[0];
};

module.exports = {
  addUser,
  getUserByUsername,
  getAllUsers,
  getAllProducts,
  getAllCart,
  getSingleUserById,
  getCartByUserId,
  postCartByUserId,
  deleteCartByUserId,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllOrders,
  getSingleOrderById,
  client,
};
