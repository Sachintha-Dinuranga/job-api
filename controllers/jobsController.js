import Job from "../models/jobsModel.js";
import mongoose from "mongoose";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import APIFilters from "../utils/apiFilters.js";

// Get all jobs => /api/v1/jobs
export const getJobs = catchAsyncErrors(async (req, res, next) => {
  const apiFilters = new APIFilters(Job.find(), req.query);
  apiFilters.filter();
  apiFilters.sort();

  const jobs = await apiFilters.query;

  res.status(200).json({
    succuss: true,
    message: "All the jobs are fetched",
    results: jobs.length,
    data: jobs,
  });
});

// Get a job by id => /api/v1/jobs:id
export const getJobsById = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const job = await Job.findById(id);

  res.status(200).json({
    succuss: true,
    message: "Single job has been fetched.",
    data: job,
  });
});

// get a single job with id and slug => /api/v1/jobs/:id/:slug
export const getJobsByIdAndSlug = catchAsyncErrors(async (req, res, next) => {
  const job = await Job.find({
    $and: [{ _id: req.params.id }, { slug: req.params.slug }],
  });

  if (!job || job.length === 0) {
    return next(new ErrorHandler("Job not found", 404));
  }

  res.status(200).json({
    success: true,
    data: job,
  });
});

// Create a new job => /api/v1/jobs
export const createJobs = catchAsyncErrors(async (req, res, next) => {
  const job = await Job.create(req.body);

  res.status(201).json({
    success: true,
    message: "Job Created",
    data: job,
  });
});

// Update a job  => /api/v1/jobs:id
export const updateJobsById = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  let job = await Job.findById(id);

  if (!job) {
    return next(new ErrorHandler("Job not found", 404));
  }

  job = await Job.findByIdAndUpdate(id, req.body, {
    returnDocument: "after",
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    succuss: true,
    message: "Single job has been updated.",
    data: job,
  });
});

// delete a job => api/v1/jobs:id
export const deleteJobs = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  let job = await Job.findById(id);

  if (!job) {
    return next(new ErrorHandler("Job not found", 404));
  }

  await Job.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    message: "Job Deleted",
  });
});
