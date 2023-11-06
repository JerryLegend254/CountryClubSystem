const express = require("express");
const bodyParser = require("body-parser");
const sgMail = require("@sendgrid/mail");
const speakeasy = require("speakeasy");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

const secretKey = speakeasy.generateSecret({ length: 20 });
sgMail.setApiKey(
  "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"
);

// Send the OTP code via email using SendGrid
app.post("/send-otp", (req, res) => {
  const otpCode = speakeasy.totp({
    secret: secretKey.base32,
    encoding: "base32",
  });

  const msg = {
    to: "jerryokuto713@gmail.com",
    from: "jeremy.okuto@strathmore.edu",
    subject: "Your OTP Code",
    text: `Your OTP code is: ${otpCode}`,
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
      res.status(200).send("OTP code sent");
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error sending OTP code");
    });
});

// Verify the OTP code
app.post("/verify-otp", (req, res) => {
  const isValid = speakeasy.totp.verify({
    secret: secretKey.base32,
    encoding: "base32",
    token: req.body.otp,
    window: 6,
  });

  console.log(req.body.otp);

  if (isValid) {
    // 2FA is successfully verified
    res.status(200).send("2FA verification successful");
  } else {
    res.status(401).send("2FA verification failed");
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
