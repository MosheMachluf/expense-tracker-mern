const express = require("express");
const router = express.Router();
const {
  getTransactions,
  addTransactions,
  deleteTransactions,
} = require("../controllers/transactionsController");

router.get("/", getTransactions);
router.post("/", addTransactions);
router.delete("/:id", deleteTransactions);

module.exports = router;
