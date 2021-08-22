const db = require("../models");
const User = db.users;

exports.createOrGetUser = async (req, res) => {
  const user = await User.findAll({ where: { email: req.user.email } });

  if (user.length === 0) {
    const createdUser = await User.create({ email: req.user.email });
    console.log("created user ", createdUser);

    res.json(createdUser);
    return;
  }

  res.json(user[0]);
};
