const {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  adminAuth,
  clientAuth,
  signOut,
  updateProfile,
} = require("../../firebase/index");

function emailSignUp(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

async function httpEmailSignUp(req, res) {
  try {
    const userRecord = await adminAuth.createUser({
      email: req.body.email,
      emailVerified: false,
      password: req.body.password,
      displayName: req.body.username,
      photoURL:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNnNH0c03eYhzzID8_Y6mHwZYYGjXLfnreH7RyT9f9GVRtT0yR7vklbKx3As07G6DCGYY&usqp=CAU",
      disabled: false,
    });

    return res.status(201).json({ msg: "User created successfully", user: userRecord });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}
async function httpEmailSignIn(req, res) {
  const { email, password } = req.body;
  signInWithEmailAndPassword(clientAuth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return res.status(200).json({ msg: "Signed In", user });
    })
    .catch((error) => {
      const errorMessage = error.message;
      return res.status(404).json({ error: errorMessage });
    });
}

async function httpSignOut(req, res) {
  signOut(clientAuth)
    .then(() => {
      // Sign-out successful.
      return res.status(200).json({ msg: "Signed Out successfully" });
    })
    .catch((error) => {
      console.log(err.message)
      return res.status(400).json({ error: error.message });
    });
}

module.exports = {
  httpEmailSignIn,
  httpEmailSignUp,
  httpSignOut,
};
