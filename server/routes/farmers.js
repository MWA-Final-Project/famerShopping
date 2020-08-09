const express = require("express");

const router = express.Router();

const {signin, signup, getAll, getByEmail, getProducts, addProducts, getOrders, addOrders} = require("../controllers/farmers")

router.post("/signin", signin);

router.post("/signup", signup);

// Get Farmers
router.get("/", getAll);

router.get("/:email", getByEmail);

// Get all products
router.get("/:email/products", getProducts);

// Add a product
router.post("/:email/products", addProducts);

// Get all orders
router.get("/:email/orders", getOrders);

// Add a product
router.post("/:email/orders", addOrders);

module.exports = router;