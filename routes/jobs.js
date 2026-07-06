import express from "express";

const router = express.Router();

// define the home page route
router.get("/jobs", (req, res) => {
  res.status(200).json({
    succuss: true,
    message: "This route will display all the jobs in future",
  });
});

export default router;
