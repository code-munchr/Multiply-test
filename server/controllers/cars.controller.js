import Car from "../models/car.model";
import extend from "lodash/extend";

const create = async (req, res) => {
  console.log("creat");
  let car = new Car(req.body);
  car.category = req.category;
  try {
    let result = await car.save();
    res.json(result);
  } catch (err) {
    return res.status(400).json({
      error: err,
    });
  }
};

const carByID = async (req, res, next, id) => {
  try {
    let car = await Car.findById(id).populate("category", "_id title").exec();
    if (!car)
      return res.status("400").json({
        error: "car not found",
      });
    req.car = car;
    next();
  } catch (err) {
    return res.status("400").json({
      error: "Could not retrieve car",
    });
  }
};

const update = async (req, res) => {
  let car = req.car;
  car = extend(car, req.body);
  car.updated = Date.now();
  try {
    let result = await car.save();
    res.json(result);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const remove = async (req, res) => {
  try {
    let car = req.car;
    let deletedCar = await car.remove();
    res.json(deletedCar);
  } catch (err) {
    return res.status(400).json({
      error: err,
    });
  }
};

const listByCategory = async (req, res) => {
  try {
    let cars = await Car.find({ category: req.category._id }).populate(
      "category",
      "_id title"
    );
    res.json(cars);
  } catch (err) {
    return res.status(400).json({
      error: err,
    });
  }
};

const list = async (req, res) => {
  try {
    let cars = await Car.find().populate("category", "_id title");
    res.json(cars);
  } catch (err) {
    return res.status(400).json({
      error: err,
    });
  }
};

export default {
  create,
  carByID,
  update,
  remove,
  listByCategory,
  list,
};
