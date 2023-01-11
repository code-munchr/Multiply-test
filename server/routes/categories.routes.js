import express from "express";
import categoryCtrl from "../controllers/categories.controller";

const router = express.Router();

router
  .route("/api/categories")
  .post(categoryCtrl.create)
  .get(categoryCtrl.list);

router
  .route("/api/categories/:categoryId")
  .get(categoryCtrl.read)
  .put(categoryCtrl.update)
  .delete(categoryCtrl.remove);

router.param("categoryId", categoryCtrl.categoryByID);

export default router;
