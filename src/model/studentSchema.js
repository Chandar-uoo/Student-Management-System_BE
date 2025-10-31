const mongoose = require("mongoose");
const validator = require("validator");

const studentSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      minlength: [2, "Full name must be at least 2 characters"],
      maxlength: [50, "Full name must not exceed 50 characters"],
      validate: {
        validator: (value) => validator.matches(value, /^[a-zA-Z\s]+$/),
        message: "Full name must contain only letters and spaces",
      },
    },

    DOB: {
      type: Date,
      required: [true, "Date of birth is required"],
    },

    gender: {
      type: String,
      enum: {
        values: ["Male", "Female", "Other"],
        message: "Gender must be Male, Female, or Other",
      },
      required: [true, "Gender is required"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: validator.isEmail,
        message: "Please enter a valid email address",
      },
    },

    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      validate: {
        validator: (v) =>
          validator.isMobilePhone(v, "any", { strictMode: false }),
        message: "Please enter a valid phone number",
      },
    },

    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
      minlength: [5, "Address must be at least 5 characters"],
      maxlength: [200, "Address must not exceed 200 characters"],
    },

    studentClass: {
      type: Number,
      min: 1,
      max: 12,
      required: true,
    },

    rollNumber: {
      type: String,
      required: [true, "Roll number is required"],
      unique: true,
      trim: true,
      validate: {
        validator: (value) => validator.matches(value, /^[a-zA-Z0-9]+$/),
        message:
          "Roll number can only contain letters and numbers (no spaces or special characters)",
      },
    },

    guardianName: {
      type: String,
      required: [true, "Guardian name is required"],
      trim: true,
      validate: {
        validator: (value) => validator.matches(value, /^[a-zA-Z\s]+$/),
        message: "guardianName must contain only letters and spaces",
      },
    },

    year: {
      type: Number,
      required: [true, "Year is required"],
    },

    photo: {
      type: String,
      trim: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// compound index for better search performance
studentSchema.index({ fullName: "text", rollNumber: 1, class: 1 });

module.exports = mongoose.model("Student", studentSchema);
