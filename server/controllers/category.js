const db = require("../models");
const Category = db.categories;
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.create({ name: name, slug: slugify(name) });
    res.json(category);
  } catch (error) {
    res.status(400).send("Kategori oluşturulamadı.");
  }
};

exports.list = async (req, res) => {
  try {
    const categoryList = await Category.findAll();
    console.log(categoryList);
    res.json(categoryList);
  } catch (error) {
    res.status(400).send("Kategoriler yüklenemedi.");
  }
};

exports.read = async (req, res) => {
  try {
    const category = await Category.findAll({
      where: { slug: req.params.slug },
    });
    res.json(category);
  } catch (error) {
    res.status(400).send("Kategori yüklenemedi.");
  }
};

exports.update = async (req, res) => {
  const { name } = req.body;
  try {
    const updated = await Category.update(
      { name: name, slug: slugify(name) },
      {
        where: { slug: req.params.slug },
      }
    );
    res.json(updated); //is it the unupdated version?
  } catch (error) {
    res.status(400).send("Kategori güncellenemedi.");
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Category.destroy({
      where: { slug: req.params.slug },
    });
    res.json(deleted);
  } catch (error) {
    res.status(400).send("Kategori silinemedi.");
  }
};
