import mongoose, { Types } from "mongoose";
const { Schema, model } = mongoose;

const applicationSchema = new Schema({
  jobTitle: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  jobLocation: {
    type: String,
    required: true,
    enum: ["onsite", "remotely", "hybrid"],
  },
  workingTime: {
    type: String,
    required: true,
    enum: ["part-time", "full-time"],
  },
  seniorityLevel: {
    type: String,
    required: true,
    enum: ["Junior", "Mid-Level", "Senior", "Team-Lead", "CTO"],
  },
  jobDescription: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  technicalSkills: {
    type: [String],
    default: [],
    required: true,
    lowercase: true,
    trim: true,
  },
  softSkills: {
    type: [String],
    default: [],
    required: true,
    lowercase: true,
    trim: true,
  },
  addedBy: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

const applicationModel = model("application", applicationSchema);

export default applicationModel;
