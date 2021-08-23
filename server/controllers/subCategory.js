const db = require("../models");
const SubCategory = db.subCategories;
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { name, category } = req.body;
    const subCategory = await SubCategory.create({
      name: name,
      slug: slugify(name),
      category_id: category,
    });
    res.json(subCategory);
  } catch (error) {
    res.status(400).send("Alt kategori oluşturulamadı.");
  }
};

exports.list = async (req, res) => {
  try {
    const subCategoryList = await SubCategory.findAll();
    console.log(subCategoryList);
    res.json(subCategoryList);
  } catch (error) {
    res.status(400).send("Alt kategoriler yüklenemedi.");
  }
};

exports.read = async (req, res) => {
  try {
    const subCategory = await SubCategory.findAll({
      where: { slug: req.params.slug },
    });
    res.json(subCategory);
  } catch (error) {
    res.status(400).send("Alt kategori yüklenemedi.");
  }
};

exports.update = async (req, res) => {
  const { name, category } = req.body;
  try {
    const updated = await SubCategory.update(
      { name: name, slug: slugify(name), category_id: category },
      {
        where: { slug: req.params.slug },
      }
    );
    res.json(updated); //is it the unupdated version?
  } catch (error) {
    res.status(400).send("Alt kategori güncellenemedi.");
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await SubCategory.destroy({
      where: { slug: req.params.slug },
    });
    res.json(deleted);
  } catch (error) {
    res.status(400).send("Alt kategori silinemedi.");
  }
};
