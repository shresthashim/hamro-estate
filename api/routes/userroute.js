const express = require("express");
const { test } = require("../controllers/usercontroller");

const router = express.Router();

router.get("/test", test)

module.exports = router;
