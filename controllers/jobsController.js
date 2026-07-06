// Get all jobs => /api/v1/jobs
export const getJobs = (req, res, next) => {
  res.status(200).json({
    succuss: true,
    message: "This route will display all the jobs in future",
  });
};
