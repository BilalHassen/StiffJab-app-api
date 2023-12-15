const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// POST route

router.post("/", (req, res) => {
  const mailData = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: "inquiry",
    text: `${req.body.name} email: ${req.body.email} message: ${req.body.message}`,
  };

  console.log({ mailData });

  transporter.sendMail(mailData, (error, info) => {
    if (error) {
      return res.status(500).send(error);
    }
    res.status(200).send({ message: "sent", message_id: info.messageId });
  });
});

module.exports = router;
