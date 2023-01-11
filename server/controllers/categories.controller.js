import Category from "../models/shop.model";
import extend from "lodash/extend";
// import errorHandler from './../helpers/dbErrorHandler'
import formidable from "formidable";

const create = (req, res) => {
//   let form = new formidable.IncomingForm();
//   form.keepExtensions = true;
//   form.parse(req, async (err, fields, files) => {
//     let category = new Category(fields);
//     category.owner = req.profile;
//     try {
//       let result = await category.save();
//       res.status(200).json(result);
//     } catch (err) {
//       return res.status(400).json({
//         error: err,
//       });
//     }
//   });
 console.log('cat create req.body', req.body)
};

const categoryByID = async (req, res, next, id) => {
  try {
    let category = await Category.findById(id)
      .populate("owner", "_id name")
      .exec();
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

const update = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    let category = req.category;
    category = extend(category, fields);
    category.updated = Date.now();
    try {
      let result = await category.save();
      res.json(result);
    } catch (err) {
      return res.status(400).json({
        error: err,
      });
    }
  });
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
    let categories = await category.find();
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
