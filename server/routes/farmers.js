const express = require("express");

const router = express.Router();

const {signin, signup, getAllFarmers, getAllProducts, addProduct, removeProduct, getAllOrders, addOrder, cancelOrder, rateFarmer, getFarmerById, updateOrderStatus, incQuantity, decQuantity} = require("../controllers/farmers")

router.post("/signin", signin);

router.post("/signup", signup);

// FARMERS

// Get all farmers
router.get("/", getAllFarmers);

// Get a farmer by email
router.get("/:farmerId", getFarmerById);

// Rate a farmer
router.post("/:farmerId/rate/:rating", rateFarmer);

// PRODUCTS

// Get all products
router.get("/:farmerId/products", getAllProducts);

// Add a product
router.post("/:farmerId/products", addProduct);

// Get all products
router.patch("/:farmerId/products/:productId/inc", incQuantity);

// Add a product
router.patch("/:farmerId/products/:productId/dec", decQuantity);

// Remove a product
router.delete("/:farmerId/products/:productId", removeProduct);

// ORDERS

// Get all orders
router.get("/:farmerId/orders", getAllOrders);

// Add a product
router.post("/:farmerId/orders", addOrder);

// Change order status
router.patch("/:farmerId/orders/:orderId", updateOrderStatus);

// Cancel an order
router.delete("/:farmerId/orders/:orderId", cancelOrder);

module.exports = router;