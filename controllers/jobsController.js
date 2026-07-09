import Job from "../models/jobsModel.js";

// Get all jobs => /api/v1/jobs
export const getJobs = async (req, res, next) => {
  const jobs = await Job.find({});

  res.status(200).json({
    succuss: true,
    message: "All the jobs are fetched",
    data: jobs,
  });
};

// Create a new job => /api/v1/jobs
export const createJobs = async (req, res, next) => {
  const job = await Job.create(req.body);

  res.status(201).json({
    success: true,
    message: "Job Created",
    data: job,
  });
};
