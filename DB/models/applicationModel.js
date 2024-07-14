import mongoose, { Types } from "mongoose";
const { Schema, model } = mongoose;

const applicationSchema = new Schema({
  jobId: {
    type: mongoose.Types.ObjectId,
    ref: "job",
    required: true,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true,
  },
  userTechSkills: {
    type: [String],
    default: [],
  },
  userSoftSkills: {
    type: [String],
    default: [],
  },
  userResume: {
    type: String,
    required: true,
  },
});

const applicationModel = model("application", applicationSchema);

export default applicationModel;
