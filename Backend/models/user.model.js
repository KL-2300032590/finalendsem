import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    password: {
      type: String,
      required: true,
    },
    college: {
      type: String,
      required: true,
    },
    collegeId: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    transactionId: {
      type: String,
    },
    paymentProof: {
      type: String,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    registeredEvents: {
      type: [String],
      default: [],
    },
    paymentId: String,
    paymentScreenshot: String,
    state: {
      type: String,
    },
    address: {
      type: String,
    },
    registrationData: {
      type: {
        originalPassword: String,
        college: String,
        collegeId: String,
        fullName: String,
      },
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
