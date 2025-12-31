const express = require("express");
const crypto = require("crypto");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");

const router = express.Router();

router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    console.log("Forgot password request:", email);

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate token
    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 mins
    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    const message = `
      <h2>Password Reset</h2>
      <p>You requested a password reset</p>
      <a href="${resetUrl}">Click here to reset password</a>
      <p>This link expires in 15 minutes</p>
    `;

    await sendEmail(
      user.email,
      "ClinicConnect Password Reset",
      message
    );

    res.json({ message: "Reset email sent" });
  } catch (error) {
    console.error("FORGOT PASSWORD ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;