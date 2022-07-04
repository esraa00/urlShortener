const mongoose = require("mongoose");
module.exports = (async () => {
  try {
    await mongoose.connect("mongodb://localhost/urlShortener");
    console.log("connected to the database successfully");
  } catch (error) {
    console.log(error);
  }
})();
