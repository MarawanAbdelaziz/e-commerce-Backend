import companyModel from "../../../../DB/models/companyModel.js";
import jobModel from "../../../../DB/models/jobModel.js";
import userModel from "../../../../DB/models/uesrModel.js";

export const addJob = async (req, res) => {
  try {
    const userId = req.user._id;

    const findCompany = await companyModel.findOne({ companyHR: userId });

    if (!findCompany) {
      return res
        .status(400)
        .json({ message: "This HR doesn't have a company" });
    }

    req.body.addedBy = userId;
    const job = await jobModel.create(req.body);

    return res.status(201).json({ job });
  } catch (error) {
    res.status(500).json({ message: "server error", error: error.message });
  }
};

export const updateJob = async (req, res) => {
  try {
    const userId = req.user._id;
    const _id = req.params.id;

    const findCompany = await companyModel.findOne({ companyHR: userId });

    if (!findCompany) {
      return res
        .status(400)
        .json({ message: "This HR doesn't have a company" });
    }

    await jobModel.findByIdAndUpdate({ _id }, req.body);

    return res.status(201).json({ message: "Job updated" });
  } catch (error) {
    res.status(500).json({ message: "server error", error: error.message });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const userId = req.user._id;
    const _id = req.params.id;

    const findCompany = await companyModel.findOne({ companyHR: userId });

    if (!findCompany) {
      return res
        .status(400)
        .json({ message: "This HR doesn't have a company" });
    }

    await jobModel.findByIdAndDelete({ _id });

    return res.status(201).json({ message: "Job deleted" });
  } catch (error) {
    res.status(500).json({ message: "server error", error: error.message });
  }
};

export const allJobs = async (req, res) => {
  const jobs = [];
  const findjobs = await jobModel.find().populate("addedBy");

  await Promise.all(
    findjobs.map(async (job) => {
      const company = await companyModel.findOne({
        companyHR: job.addedBy,
      });

      jobs.push({ company, job });
    })
  );

  res.json({ jobs });
};

export const addJob4 = async (req, res) => {};
export const addJob5 = async (req, res) => {};
export const addJob6 = async (req, res) => {};
