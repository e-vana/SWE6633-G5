const mongoose = require("mongoose");

let projectMemberSchema = mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    role: {
      type: String
    }
  },
  {
    timestamps: true,
  }
);

let ProjectMember = mongoose.model("ProjectMember", projectMemberSchema);

module.exports = ProjectMember;
