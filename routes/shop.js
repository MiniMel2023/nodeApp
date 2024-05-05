const path = require("path");

const express = require("express");

const router = express.Router();

const shopController = require("../controllers/shop");

router.get("/", shopController.getIndex);

router.post("/checkout", shopController.getCheckout);

router.get("/cart", shopController.getCart);

router.post("/cart", shopController.postCart);

router.post("/cart-delete-item", shopController.postCartDeleteItem);

router.get("/orders", shopController.getOrder);

router.get("/products", shopController.getProducts);

router.get("/products/:productId", shopController.getProduct);

module.exports = router;
