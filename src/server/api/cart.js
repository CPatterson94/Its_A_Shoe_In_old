const express = require('express');
const router = express.Router();

const {
    getAllCart,
    getCartByUserId,
    postCartByUserId,
    deleteCartByUserId,
} = require("./db")

router.get('/', async(req, res, next) => {
    try {
        res.send(await getAllCart());
      } catch (err) {
        next(err);
      }
    });

router.get('/:id', async (req, res) => {
    try {
        const userId = req.params.userId;
        const cart = await getCartByUserId(userId);
        res.json(cart);
    } catch (error) {
        console.error("Error fetching cart items:", error);
        res.status(500).json({ error: "Error fetching cart items" });
    }
});


router.post('/', async (req, res) => {
    try {
        const { product_id, user_id } = req.body;
        const newCartItem = await postCartByUserId({ product_id, user_id });
        res.json(newCartItem);
    } catch (error) {
        console.error("Error adding item to cart:", error);
        res.status(500).json({ error: "Error adding item to cart" });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const cartItemId = req.params.id;
        const deletedItem = await deleteCartByUserId(cartItemId);
        res.json(deletedItem);
    } catch (error) {
        console.error("Error deleting item from cart:", error);
        res.status(500).json({ error: "Error deleting item from cart" });
    }
});

module.exports = router;

