import { application } from "express";
import companyModel from "../../../../DB/models/companyModel.js";
import jobModel from "../../../../DB/models/jobModel.js";
import userModel from "../../../../DB/models/uesrModel.js";
import applicationModel from "../../../../DB/models/applicationModel.js";
import asyncHandler from "../../../middleware/asyncHandler.js";

export const addCompany = asyncHandler(async (req, res) => {
  const _id = req.user._id;

  const findCompanyName = await companyModel.findOne({
    companyName: req.body.companyName,
  });

  const findCompanyEmail = await companyModel.findOne({
    companyEmail: req.body.companyEmail,
  });

  if (findCompanyName || findCompanyEmail) {
    return res
      .status(400)
      .json({ message: "Company name or company Email already exist" });
  }

  if (req.body.numberOfEmployees < 11 || req.body.numberOfEmployees > 20) {
    return res
      .status(400)
      .json({ message: "Number of employees Should between 11 and 20" });
  }
  req.body.companyHR = _id;

  const company = await companyModel.create(req.body);

  res.status(201).json({ company: company });
});

export const updateCompany = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const _id = req.params.id;

  const findCompany = await companyModel.findById({ _id });

  if (!findCompany) {
    return res.status(400).json({ message: "Company not exist" });
  }

  if (userId.toString() != findCompany.companyHR.toString()) {
    return res.status(400).json({ message: "you are not the owner" });
  }

  if (
    req.body.companyName.toLowerCase() == findCompany.companyName ||
    req.body.companyEmail.toLowerCase() == findCompany.companyEmail
  ) {
    return res
      .status(400)
      .json({ message: "Company name or company Email already exist" });
  }

  if (req.body.numberOfEmployees < 11 || req.body.numberOfEmployees > 20) {
    return res
      .status(400)
      .json({ message: "Number of employees Should between 11 and 20" });
  }

  await companyModel.findByIdAndUpdate({ _id }, req.body);

  res.json({ message: "Company updated" });
});

export const deleteCompany = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const _id = req.params.id;

  const findCompany = await companyModel.findById({ _id });

  if (!findCompany) {
    return res.status(400).json({ message: "Company not exist" });
  }

  if (userId.toString() != findCompany.companyHR.toString()) {
    return res.status(400).json({ message: "you are not the owner" });
  }

  await companyModel.findByIdAndDelete({ _id });

  return res.json({ message: "Company deleted" });
});

export const getCompany = asyncHandler(async (req, res) => {
  const _id = req.params.id;

  const findCompany = await companyModel.findById({ _id });

  if (!findCompany) {
    return res.status(400).json({ message: "Company not exist" });
  }

  const findjobs = await jobModel.find({ addedBy: findCompany.companyHR });

  if (!findjobs) {
    return res
      .status(400)
      .json({ message: "this company doesn't have any jobs" });
  }

  res.json({ company: findCompany, jobs: findjobs });
});

export const searchByCompanyName = asyncHandler(async (req, res) => {
  const companyName = req.body.companyName;

  const findCompany = await companyModel.findOne({ companyName });

  if (!findCompany) {
    return res.status(400).json({ message: "Company not exist" });
  }

  res.json({ findCompany });
});

// Get all applications for specific Job
export const GAAFSJ = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const _id = req.params.id;
  const jobId = req.body.jobId;

  const findCompany = await companyModel.findById({ _id });

  if (!findCompany) {
    return res.status(400).json({ message: "Company not exist" });
  }

  if (userId.toString() != findCompany.companyHR.toString()) {
    return res.status(400).json({ message: "you are not the owner" });
  }

  const findJop = await applicationModel.find({ jobId });

  return res.json({ applications: findJop });
});
