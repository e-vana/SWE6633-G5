const mongoose = require("mongoose");

let projectRequirementSchema = mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
    type: {
      type: String,
    },
    priority: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

let ProjectRequirement = mongoose.model("ProjectRequirement", projectRequirementSchema);

module.exports = ProjectRequirement;
