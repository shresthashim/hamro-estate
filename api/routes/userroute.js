const express = require("express");
const { test, updateUser, deleteUser, getUserListing, getUser } = require("../controllers/usercontroller");
const { verifyToken } = require("../utils/verifyUser");

const router = express.Router();

router.get("/test", test)
router.post("/update/:id",verifyToken, updateUser )
router.delete("/delete/:id",verifyToken, deleteUser)
router.get("/listings/:id", verifyToken, getUserListing)
router.get('/:id', verifyToken, getUser)

module.exports = router;
