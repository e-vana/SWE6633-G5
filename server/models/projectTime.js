const mongoose = require("mongoose");

let projectTimeSchema = mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
    taskName: {
      type: String,
    },
    hours: {
      type: Number,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
  },
  {
    timestamps: true,
  }
);

let ProjectTime = mongoose.model("ProjectTime", projectTimeSchema);

module.exports = ProjectTime;
