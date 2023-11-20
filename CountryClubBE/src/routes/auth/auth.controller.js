const {
  signInWithEmailAndPassword,
  adminAuth,
  clientAuth,
  db,
  setDoc,
  doc
} = require("../../firebase/index");

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

    // const additionalClaims = {
    //   email: userRecord.email,
    //   displayName: userRecord.displayName,
    //   photoURL: userRecord.photoURL,
    // };
    // const customToken = await adminAuth.createCustomToken(
    //   userRecord.uid,
    //   additionalClaims
    // );

    // Assign a role to the user
    const role = "user"; // Set the default role or determine it based on your logic
    await setDoc(doc(db, "userRoles", userRecord.uid), { role });

    return res.status(201).json({ msg: "User created successfully" });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}
// async function httpEmailSignIn(req, res) {
//   const { email, password } = req.body;
//   signInWithEmailAndPassword(clientAuth, email, password)
//     .then(async (userCredential) => {
//       const user = userCredential.user;
//       // Set session cookie
//       const idToken = await userCredential.user.getIdToken();
//       res.cookie("session", idToken, {
//         httpOnly: true,
//       });

//       console.log(res.session)
//       return res.status(200).json({ msg: "Signed In", user });
//     })
//     .catch((error) => {
//       const errorMessage = error.message;
//       return res.status(404).json({ error: errorMessage });
//     });
// }

// async function httpEmailSignIn(req, res) {
//   const { email, password } = req.body;

//   try {
//     const userCredential = await signInWithEmailAndPassword(
//       clientAuth,
//       email,
//       password
//     );
//     const user = userCredential.user;

//     // Set session cookie
//     const idToken = await user.getIdToken();

//     req.session.token = idToken;
//     console.log(req.session.token);
//     res.status(200).json({ msg: "Signed In", user });
//   } catch (error) {
//     const errorMessage = error.message;
//     res.status(404).json({ error: errorMessage });
//   }
// }

module.exports = {
  httpEmailSignUp,
};
