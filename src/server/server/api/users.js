const express = require("express");
const router = express.Router();
const { authenticateToken, isAdmin } = require("../auth/middleware");
const { getAllUsers, getSingleUserById } = require("./db");

router.get("/", authenticateToken, isAdmin, async (req, res, next) => {
  try {
    res.send(await getAllUsers());
  } catch (err) {
    next(err);
  }
});
router.get("/:id", authenticateToken, async (req, res, next) => {
  try {
    res.send(await getSingleUserById(req.params.id));
  } catch (err) {
    next(err);
  }
});
module.exports = router;
