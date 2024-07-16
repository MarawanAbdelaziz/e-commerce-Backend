import joi from "joi";

export const addJobValidation = joi.object({
  jobTitle: joi.string().min(5).max(30).required(),
  jobLocation: joi.string().valid('onsite','remotely','hybrid').required(),
  workingTime: joi.string().valid('part-time','full-time').required(),
  seniorityLevel: joi.string().valid('Junior','Mid-Level','Senior','Team-Lead','CTO').required(),
  jobDescription: joi.string().required(),
  technicalSkills: joi.array().items(joi.string()).required(),
  softSkills: joi.array().items(joi.string()).required(),
});

export const JobsWithFiltersValidation = joi.object({
  jobTitle: joi.string().allow(''),
  jobLocation: joi.string().valid('onsite','remotely','hybrid').allow(''),
  workingTime: joi.string().valid('part-time','full-time').allow(''),
  seniorityLevel: joi.string().valid('Junior','Mid-Level','Senior','Team-Lead','CTO').allow(''),
  technicalSkills: joi.string().allow(''),
});
