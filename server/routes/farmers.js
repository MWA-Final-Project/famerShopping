const express = require("express");

const router = express.Router();

const {signin, signup, getAllFarmers: getAll, getFarmerByEmail: getByEmail, getAllProducts: getProducts, addProduct: addProducts, removeProduct, getAllOrders: getOrders, addOrder: addOrders, cancelOrder, rateFarmer} = require("../controllers/farmers")

router.post("/signin", signin);

router.post("/signup", signup);

// FARMERS

// Get all farmers
router.get("/", getAll);

// Get a farmer by email
router.get("/:email", getByEmail);

// Rate a farmer
router.post("/:email/rate/:rating", rateFarmer);

// PRODUCTS

// Get all products
router.get("/:email/products", getProducts);

// Add a product
router.post("/:email/products", addProducts);

// Remove a product
router.delete("/:email/products/:id", removeProduct);

// ORDERS

// Get all orders
router.get("/:email/orders", getOrders);

// Add a product
router.post("/:email/orders", addOrders);

// Cancel an order
router.delete("/:email/orders/:id", cancelOrder);

module.exports = router;