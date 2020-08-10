const express = require("express");

const router = express.Router();

const {signin, signup, getAllOrders, getAllCustomers, getCustomerCart, addToCart, removeFromCart, addOrder, checkout, cancelOrder} = require("./../controllers/custmers")

router.post("/signin", signin);

router.post("/signup", signup);

router.get("/", getAllCustomers);
router.get("/:custId/orders", getAllOrders);
router.get("/:custId/cart", getCustomerCart);
router.post("/:custId/orders", addOrder);
router.post("/:custId/cart", addToCart);
router.delete("/:custId/cart/:orderId", removeFromCart);
router.post("/:custId/checkout", checkout);
router.delete("/:custId/orders/:orderId", cancelOrder);

module.exports = router;