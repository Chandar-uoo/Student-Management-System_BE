const fs = require("fs");
const path = require("path");    

const deleteOldPhoto = (photoPath) => {
  if (!photoPath) {
    console.log(" No photo path provided");
    return;
  }

  const filename = photoPath.split("/uploads/")[1];
  if (!filename) {
    console.log(" Filename not found in photoPath:", photoPath);
    return;
  }

const filePath = path.join(__dirname, "../../uploads", filename);

  console.log("🧾 Trying to delete file at:", filePath);

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log(" Deleted old photo:", filePath);
  } else {
    console.log("File not found at path:", filePath);
  }
};
module.exports = deleteOldPhoto;