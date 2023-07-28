const File = require("./models/file");
const fs = require("fs");
const connectDB = require("./config/db");
connectDB();

async function fetchData() {
  // Fetch all the 24 hours old files from database and then delete them one by one
  const pastDate = new Date(Date.now() - 1000 * 60 * 60 * 24);
  const files = File.find({
    createdAt: { $lt: pastDate },
  });
  if (!files) {
    console.log("No files found.");
  }
  if (files.length) {
    for (const file of files) {
      try {
        fs.unlinkSync(file.path);
        console.log("file deleted");
        await file.remove();
        console.log("deleted from database as well");
      } catch (err) {
        console.log("Error" + err);
      }
    }
  }
  console.log("out of for loop and end of function");
}

fetchData().then(()=>{
    console.log("Scheduler finished successfully.");
    process.exit();
});
