const express = require("express");

const router = express.Router();

const {signin, signup, getAllOrders, getAllCustomers, getCustomerCart, addToCart, removeFromCart} = require("./../controllers/custmers")

router.post("/signin", signin);

router.post("/signup", signup);

router.get("/", getAllCustomers);
router.get("/:custId/orders", getAllOrders);
router.get("/:custId/cart", getCustomerCart);
router.post("/:custId/cart/order", addToCart);
router.post("/:custId/cart/:orderId", removeFromCart);
// router.delete("/:custId/orders/:orderId", );

module.exports = router;