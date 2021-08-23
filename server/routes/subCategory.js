const express = require("express");
const router = express.Router();

//middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

//controllers
const {
  create,
  read,
  update,
  remove,
  list,
} = require("../controllers/subCategory");

//routes
router.post("/create-subcategory", authCheck, adminCheck, create);
router.get("/subcategories", list);
router.get("/subcategory/:slug", read);
router.put("/subcategory/:slug", authCheck, adminCheck, update);
router.delete("/subcategory/:slug", authCheck, adminCheck, remove);

module.exports = router;
