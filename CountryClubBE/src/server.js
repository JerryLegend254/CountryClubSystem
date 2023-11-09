const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const sgMail = require("@sendgrid/mail");
const speakeasy = require("speakeasy");
const AuthRouter = require("./routes/auth/auth.routes");
require("dotenv").config();

const PORT = process.env.PORT || 8000;

const data = [
  {
    displayName: "Jeremy Okuto",
    email: "jerryokuto713@gmail.com",
    photoURL:
      "https://static1.srcdn.com/wordpress/wp-content/uploads/2019/01/movmvslnmshxbu0ydicq.jpg?q=50&fit=crop&w=1500&dpr=1.5",
  },
];
const app = express();

app.use(
  cors({
    origin: "http://localhost:3030",
  })
);
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

const secretKey = speakeasy.generateSecret({ length: 20 });
sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

app.use("/auth", AuthRouter);
app.get("/data", (req, res) => {
  console.log("Data fetched");
  res.status(200).json(data[0]);
});

// Send the OTP code via email using SendGrid
app.post("/send-otp", (req, res) => {
  const otpCode = speakeasy.totp({
    secret: secretKey.base32,
    encoding: "base32",
  });

  const msg = {
    to: req.body.toEmail,
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

  if (isValid) {
    // 2FA is successfully verified
    res.status(200).send("2FA verification successful");
  } else {
    res.status(401).send("2FA verification failed");
  }
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
