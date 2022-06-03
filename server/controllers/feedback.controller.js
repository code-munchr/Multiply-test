import Feedback from "../models/feedback.model";
import errorHandler from "./../helpers/dbErrorHandler";
import formidable from "formidable";

const create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields) => {
    let feedback = new Feedback(fields);
    feedback.author = req.profile;
    try {
      let result = await feedback.save();
      res.status(200).json(result);
    } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err),
      });
    }
  });
};

const listByAuthor = async (req, res) => {
  try {
    let feedbacks = await Feedback.find({ author: req.profile._id }).populate(
      "author",
      "_id content created"
    );
    res.json(feedbacks);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

export default {
  create,
  listByAuthor,
};
