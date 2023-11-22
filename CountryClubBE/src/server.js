const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session")
const path = require("path");
const sgMail = require("@sendgrid/mail");
const speakeasy = require("speakeasy");
const AuthRouter = require("./routes/auth/auth.routes");
const SportsplanRouter = require("./routes/sportsplan/sportsplan.route");
const PaymentRouter = require("./routes/payments/payment.routes");
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
app.use(
  express.static(
    path.join(__dirname, "..", "..", "CountryClubFE", "dist")
  )
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

const secretKey = speakeasy.generateSecret({ length: 20 });
sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

app.use("/auth", AuthRouter);
app.use("/sportsplan", SportsplanRouter);
app.use("/payment", PaymentRouter);




// Middleware to handle authentication for each request
async function authenticate (req, res, next){
  const authToken = req.headers.authorization;
  if (!authToken) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    const user = await verifyAuthToken(authToken); // Implement this function to verify the auth token
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Unauthorized' });
  }
};

// Example route that requires authentication
// app.get('/api/currentUser', authenticate, (req, res) => {
//   res.status(200).json({ user: req.user });
// });

// Function to verify the authentication token
const verifyAuthToken = async (authToken) => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(clientAuth, (user) => {
      if (user) {
        // Check if the provided auth token matches the user's token
        // This is a simplified example; in a real-world scenario, you would verify the token with Firebase Authentication
        resolve(user);
      } else {
        reject(new Error('User not authenticated'));
      }
    });
  });
};

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
  res.sendFile(path.join(__dirname, "..", "..", "CountryClubFE", "dist","index.html"));
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
