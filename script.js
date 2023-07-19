const File = require("./model/file");
const fs = require("fs");
const connect_db = require("./config/db");
connect_db;

async function deleteFile(req, res) {
  const pastdate = new Date(Date.now() - 1000 * 24 * 60 * 60);
  const files = await File.find({ createdAt: { $lt: pastdate } });
  for (const file of files) {
    try {
      fs.unlinkSync(file.path);
      await file.deleteOne({ _id: file._id });
    } catch (error) {
      console.log("🚀 ~ file: script.js:15 ~ deleteFile ~ error:", error);
    }
  }
}

deleteFile().then(() => {
  console.log("🚀  Success");
  process.exit();
});
