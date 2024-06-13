const express = require("express");
const router = express.Router();
const { getAllUsers, getSingleUserById } = require("./db");

router.get("/", async (req, res, next) => {
  try {
    res.send(await getAllUsers());
  } catch (err) {
    next(err);
  }
});
router.get("/:id", async (req, res, next) => {
  try {
    res.send(await getSingleUserById(req.params.id));
  } catch (err) {
    next(err);
  }
});
module.exports = router;
