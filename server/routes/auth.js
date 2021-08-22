const express = require("express");
const router = express.Router();

//middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

//controllers
const { createOrGetUser } = require("../controllers/auth");

router.post("/create-or-get-user", authCheck, createOrGetUser);
router.post("/current-admin", authCheck, adminCheck, createOrGetUser);

module.exports = router;
