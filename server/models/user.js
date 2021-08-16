module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("User", {
    name: Sequelize.STRING,
    email: { type: Sequelize.STRING, notNull: true },
    role: { type: Sequelize.STRING, defaultValue: "subscriber" },
    address: Sequelize.STRING,
  });

  return User;
};
