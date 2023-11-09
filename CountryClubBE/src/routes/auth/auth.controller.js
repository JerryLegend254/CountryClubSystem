const {
  createUserWithEmailAndPassword,
  auth,
} = require("../../firebase/index");

function emailSignUp(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

async function httpEmailSignIn(req, res) {
  try {
    const user = await emailSignUp(req.body.email, req.body.password);
    return res.status(201).json({ msg: "User was created successfully", user });
  } catch (err) {
    return res.status(400).json({ error: err });
  }
}

module.exports = {
  httpEmailSignIn,
};
