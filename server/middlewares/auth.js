const admin = require("../firebase");

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
