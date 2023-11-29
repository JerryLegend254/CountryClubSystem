const {
  signInWithEmailAndPassword,
  adminAuth,
  clientAuth,
  db,
  setDoc,
  doc,
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

    return res.status(201).json({ msg: "User created successfully" });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}


async function httpGetAllUsers(req, res) {
  const members = [];

  async function listAllUsers(nextPageToken) {
    try {
      // List batch of users, 1000 at a time.
      const listUsersResult = await adminAuth.listUsers(1000, nextPageToken);

      listUsersResult.users.forEach((userRecord) => {
        const { uid, displayName, email, emailVerified, disabled, photoURL } =
          userRecord.toJSON();
        members.push({
          uid,
          disabled,
          name: displayName,
          email,
          emailVerified,
          photoURL,
        });
      });

      if (listUsersResult.pageToken) {
        // List next batch of users.
        await listAllUsers(listUsersResult.pageToken);
      }

      return members;
    } catch (error) {
      console.log("Error listing users:", error);
      throw error;
    }
  }

  try {
    const membersList = await listAllUsers();
    return res.status(200).json(membersList);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: err.message || "Internal Server Error" });
  }
}

module.exports = {
  httpEmailSignUp,
  httpGetAllUsers,
};
