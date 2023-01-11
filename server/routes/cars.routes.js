import express from "express";
import carsCtrl from "../controllers/cars.controller";
import categoryCtrl from "../controllers/categories.controller";

const router = express.Router();

router
  .route("/api/cars/in/:categoryId")
  .post(carsCtrl.create)
  .get(carsCtrl.listByCategory);
router
  .route("/api/cars/:carId")
  .put(carsCtrl.update)
  .delete(carsCtrl.remove);

router.route("/api/cars").get(carsCtrl.list);

router.param("categoryId", categoryCtrl.categoryByID);
router.param("carId", carsCtrl.carByID);

export default router;
