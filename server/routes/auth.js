const express = require("express");
const router = express.Router();

//middlewares
const { authCheck } = require("../middlewares/auth");

//controllers
const { createOrGetUser } = require("../controllers/auth");

router.post("/create-or-get-user", authCheck, createOrGetUser);

module.exports = router;
