import express from "express";
import userCtrl from "../controllers/user.controller";
import authCtrl from "../controllers/auth.controller";
import feedbackCtrl from "../controllers/feedback.controller";

const router = express.Router();

router
  .route("/api/feedbacks/by/:userId")
  .post(authCtrl.requireSignin, feedbackCtrl.create)
  .get(authCtrl.requireSignin, feedbackCtrl.listByAuthor);

router.param("userId", userCtrl.userByID);

export default router;
