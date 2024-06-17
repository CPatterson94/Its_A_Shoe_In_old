const express = require("express");
const router = express.Router();
const { isAdmin } = require("../auth/middleware");
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("./db");

router.get("/", async (req, res, next) => {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const product = await getProductById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).send("Product not found");
    }
  } catch (err) {
    next(err);
  }
});

router.post("/", isAdmin, async (req, res, next) => {
  try {
    const newProduct = await createProduct(req.body);
    res.status(201).json(newProduct);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", isAdmin, async (req, res, next) => {
  try {
    const updatedProduct = await updateProduct(req.params.id, req.body);
    if (updatedProduct) {
      res.json(updatedProduct);
    } else {
      res.status(404).send("Product not found");
    }
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", isAdmin, async (req, res, next) => {
  try {
    const deletedProduct = await deleteProduct(req.params.id);
    if (deletedProduct) {
      res.json(deletedProduct);
    } else {
      res.status(404).send("Product not found");
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
