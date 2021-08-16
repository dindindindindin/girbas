const db = require("../models");
const User = db.users;

exports.createOrUpdateUser = (req, res) => {
  res.json({ data: "hi node createorupdateuser" });
};
