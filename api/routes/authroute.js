const express = require("express");
const { signup, signin, google, signout } = require("../controllers/authcontroller");

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", google);
router.get('/signout', signout)

module.exports = router;
