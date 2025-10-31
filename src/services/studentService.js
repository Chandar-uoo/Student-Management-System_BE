const studentSchema = require("../model//studentSchema");
const { default: mongoose } = require("mongoose");
const AppError = require("../utils/AppError");
const fs = require("fs");

const { validateStudentDetails } = require("../validation/validateStudentData");
const {
  validateStudentUpdateDetails,
} = require("../validation/validateStudentUpdateDetails");
exports.addStudentService = async (req) => {
  const {
    fullName,
    DOB,
    gender,
    email,
    phoneNumber,
    address,
    rollNumber,
    guardianName,
    year,
    photo,
    studentClass,
  } = req.body;
  await validateStudentDetails({ fullName, email, rollNumber });
  const newStudent = await studentSchema.create({
    fullName,
    DOB,
    gender,
    phoneNumber,
    address,
    email,
    rollNumber,
    guardianName,
    year,
    photo,
    studentClass,
  });

  return { newStudent };
};

exports.updateStudentService = async (req, deleteOldPhoto) => {
  const { id } = req.params;
  const {
    fullName,
    DOB,
    gender,
    email,
    phoneNumber,
    address,
    rollNumber,
    guardianName,
    year,
    photo,
    studentClass,
  } = req.body;
  await validateStudentUpdateDetails({
    id,
    fullName,
    email,
    rollNumber,
    photo,
    deleteOldPhoto,
  });

 await studentSchema.findByIdAndUpdate(
    id,
    {
      fullName,
      DOB,
      gender,
      phoneNumber,
      address,
      email,
      rollNumber,
      guardianName,
      year,
      photo,
      studentClass,
    },
    { new: true, runValidators: true }
  );

  return;
};

exports.deleteStudentSevice = async (req,deleteOldPhoto) => {
  const { id } = req.params;
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError("Bad Request", 400);
  }

  const student = await studentSchema.findById(id);
  if (!student) {
    throw new AppError("student not found", 404);
  }
  if (student.photo) {
    const filename = student.photo.split("/uploads/")[1];
    const filePath = path.join("uploads", filename);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log("🧹 Deleted old photo:", filename);
    }
  }
  await studentSchema.findByIdAndUpdate(id, {
    isDeleted: true,
  });
  return;
};
exports.searchStudentService = async (req) => {
  const { q } = req.query;

  const query = {};
  query.isDeleted = false;
  // split by commas and trim spaces
  const searchTerms = q
    .split(",")
    .map((term) => term.trim())
    .filter(Boolean);

  // build conditions for each term
  const orConditions = [];

  for (const term of searchTerms) {
    if (!isNaN(term)) {
      // numeric — could be a class
      orConditions.push({ studentClass: Number(term) });
    }

    // text-like — could be name or roll number
    orConditions.push(
      { fullName: { $regex: term, $options: "i" } },
      { rollNumber: { $regex: term, $options: "i" } }
    );
  }

  // add to main query
  query.$or = orConditions;

  const students = await studentSchema.find(query).limit(20).lean();

  return { students };
};

exports.readAllStudentService = async () => {
  const students = await studentSchema
    .find({ isDeleted: false })
    .limit(20)
    .lean();
  return { students };
};

exports.studentAnalyticsService = async () => {
  const result = await studentSchema.aggregate([
    { $match: { isDeleted: false } },
    {
      $group: {
        _id: "$year",
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        year: "$_id",
        count: 1,
      },
    },
    { $sort: { year: -1 } },
  ]);

  return { result };
};
