import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  pitchure: {
    type: String,
    default: "",
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin", "cityManager"],
  },
  branch: [{ type: mongoose.Schema.Types.ObjectId, ref: "Branch" }],
});

const User = mongoose.model("User", userSchema);
export default User;
