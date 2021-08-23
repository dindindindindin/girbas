module.exports = (sequelize, Sequelize) => {
  const SubCategory = sequelize.define(
    "SubCategory",
    {
      name: { type: Sequelize.STRING, notNull: true },
      slug: { type: Sequelize.STRING, notNull: true, unique: true },
      category_id: {
        type: Sequelize.INTEGER,
        notNull: true,
        references: { model: "Categories", key: "id" },
      },
    },
    { timestamps: false }
  );

  return SubCategory;
};
