import Category from "../models/category.model";
import extend from "lodash/extend";

const create = async (req, res) => {
  try {
    let category = new Category(req.body);
    let result = await category.save();
    res.status(200).json(result);
  } catch (err) {
    return res.status(400).json({
      error: err,
    });
  }
};

const categoryByID = async (req, res, next, id) => {
  try {
    let category = await Category.findById(id);
    if (!category)
      return res.status("400").json({
        error: "category not found",
      });
    req.category = category;
    next();
  } catch (err) {
    return res.status("400").json({
      error: "Could not retrieve category",
    });
  }
};

const read = (req, res) => {
  return res.json(req.category);
};

const update = async (req, res) => {
  let category = req.category;
  category = extend(category, req.body);
  category.updated = Date.now();
  try {
    let result = await category.save();
    res.json(result);
  } catch (err) {
    return res.status(400).json({
      error: err,
    });
  }
};

const remove = async (req, res) => {
  try {
    let category = req.category;
    let deletedcategory = category.remove();
    res.json(deletedcategory);
  } catch (err) {
    return res.status(400).json({
      error: err,
    });
  }
};

const list = async (req, res) => {
  try {
    let categories = await Category.find();
    res.json(categories);
  } catch (err) {
    return res.status(400).json({
      error: err,
    });
  }
};

export default {
  create,
  categoryByID,
  list,
  read,
  update,
  remove,
};
