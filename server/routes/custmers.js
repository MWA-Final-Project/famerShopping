const express = require("express");

const router = express.Router();

const { signin, signup, getAllOrders, getAllCustomers, getCustomerCart, addToCart, 
    removeFromCart, addOrder, checkout, cancelOrder, getAllOrdersByStatus, rateFarmer } = 
    require("./../controllers/custmers")

router.post("/signin", signin);

router.post("/signup", signup);

// Get all customers
router.get("/", getAllCustomers);

// Get all orders of a customer
router.get("/:custId/orders", getAllOrders);

// // Get all orders of a customer filtered by status and sorted by date
// router.get("/:custId/orders/:status", getAllOrdersByStatus);

// Get customer's shopping cart
router.get("/:custId/cart", getCustomerCart);

// Add order to customer's order history
router.post("/:custId/orders", addOrder);

// Add order to shopping cart
router.patch("/:custId/cart/:productId", addToCart);

// // Add order to shopping cart
// router.post("/:custId/cart/orders/:orderId", incCartOrderQuantity);

// Remove order from shopping cart
router.delete("/:custId/cart/:orderId", removeFromCart);

// Checkout
router.post("/:custId/checkout", checkout);

// Cancel order
router.delete("/:custId/orders/:orderId", cancelOrder);

// Rate a farmer
router.post("/:productId/rate/:rating", rateFarmer);

module.exports = router;