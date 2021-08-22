module.exports = (sequelize, Sequelize) => {
  const Category = sequelize.define(
    "Category",
    {
      name: { type: Sequelize.STRING, notNull: true },
      slug: { type: Sequelize.STRING, notNull: true, unique: true },
    },
    { timestamps: false }
  );

  return Category;
};
