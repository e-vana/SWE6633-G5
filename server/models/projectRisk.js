const mongoose = require("mongoose");

let projectRiskSchema = mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
    type: {
      type: String,
    },
    severity: {
      type: String,
    },
    description: {
      type: String,
    },
    resolved: {
      type: Boolean
    }
  },
  {
    timestamps: true,
  }
);

let ProjectRisk = mongoose.model("ProjectRisk", projectRiskSchema);

module.exports = ProjectRisk;
