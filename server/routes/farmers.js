const express = require("express");

const router = express.Router();

const {signin, signup, getAllFarmers: getAll, getFarmerByEmail: getByEmail, getAllProducts: getProducts, addProduct: addProducts, removeProduct, getAllOrders: getOrders, addOrder: addOrders, cancelOrder, rateFarmer, getFarmerById, updateOrderStatus: changeOrderStatus} = require("../controllers/farmers")

router.post("/signin", signin);

router.post("/signup", signup);

// FARMERS

// Get all farmers
router.get("/", getAll);

// Get a farmer by email
router.get("/:farmerId", getFarmerById);

// Rate a farmer
router.post("/:farmerId/rate/:rating", rateFarmer);

// PRODUCTS

// Get all products
router.get("/:farmerId/products", getProducts);

// Add a product
router.post("/:farmerId/products", addProducts);

// Remove a product
router.delete("/:farmerId/products/:productId", removeProduct);

// ORDERS

// Get all orders
router.get("/:farmerId/orders", getOrders);

// Add a product
router.post("/:farmerId/orders", addOrders);

// Change order status
router.patch("/:farmerId/orders/:orderId", changeOrderStatus);

// Cancel an order
router.delete("/:farmerId/orders/:orderId", cancelOrder);

module.exports = router;