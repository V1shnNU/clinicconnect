require("dotenv").config();
const sendEmail = require("./utils/sendEmail");

sendEmail({
  to: "test@example.com",
  subject: "Test Mail",
  html: "<h1>Hello from ClinicConnect</h1>",
})
  .then(() => console.log("Email sent"))
  .catch(err => console.error("Email error:", err));