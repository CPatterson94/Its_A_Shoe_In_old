const pg = require("pg");

const client = new pg.Client("postgres://localhost/shoe_store");

const getAllUsers = async () => {
  const response = await client.query(`SELECT * FROM users ORDER BY id ASC`);
  return response.rows;
};
const getAllProducts = async () => {
  const response = await client.query(`SELECT * FROM products ORDER BY id ASC`);
  return response.rows;
};
const getAllCart = async () => {
  const response = await client.query(`SELECT * FROM cart ORDER BY id ASC`);
  return response.rows;
};
// const getSingleUserById = async (id) => {
//   const response = await client.query(`SELECT * FROM users WHERE id = $1`, [
//     id,
//   ]);
//   return response.rows[0];
// };
// const getCartByUserId = async (params_id) => {
//   const cart_response = await client.query(
//     `SELECT * FROM cart WHERE user_id = $1`,
//     [params_id]
//   );
//   return {
//     cart: cart_response.rows,
//   };
// };
// const postCartByUserId = async (body) => {
//   await client.query(`INSERT INTO cart(product_id, user_id) VALUES($1, $2)`, [
//     body.product_id,
//     body.user_id,
//   ]);
//   return {
//     product_id: body.product_id,
//     user_id: body.user_id,
//   };
// };
// const deleteCartByUserId = async (id) => {
//   await client.query(`DELETE FROM cart WHERE id = $1`, [Number(id)]);
//   return {
//     id: id,
//   };
// };
module.exports = {
  getAllUsers,
  getAllProducts,
  getAllCart,
  //   getSingleUserById,
  //   getCartByUserId,
  //   postCartByUserId,
  //   deleteCartByUserId,
  client,
};
