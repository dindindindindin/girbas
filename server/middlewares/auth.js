const admin = require("../firebase");
const db = require("../models");
const User = db.users;

exports.authCheck = async (req, res, cbFn) => {
  try {
    const firebaseUser = await admin
      .auth()
      .verifyIdToken(req.headers.authtoken);

    req.user = firebaseUser;
    // console.log("firebase user in authcheck: ", firebaseUser);

    cbFn();
  } catch (err) {
    res.status(401).json({ err: "invalid or expired token" });
  }
};

exports.adminCheck = async (req, res, cbFn) => {
  const { email } = req.user;
  const adminUser = await User.findAll({ where: { email: email } });
  console.log("adminuser role: ", adminUser[0].role);
  if (adminUser[0].role !== "admin") {
    res.status(403).json({ error: "Admin paneli. Girişiniz yasak." });
  } else {
    cbFn();
  }
};
