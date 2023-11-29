const express = require("express");
const { createListing, deleteListing , updateListing, getListing} = require("../controllers/listingcontroller");
const { verifyToken } = require("../utils/verifyUser");

const router = express.Router();

router.post("/create", verifyToken, createListing);
router.delete("/delete/:id", verifyToken, deleteListing);
router.post("/update/:id", verifyToken, updateListing);
router.get("/get/:id",  getListing)

module.exports = router;
