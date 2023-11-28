const { UserRecord } = require("firebase-admin/auth");
const {
  getDocs,
  collection,
  getDoc,
  query,
  doc,
  updateDoc,
  deleteDoc,
} = require("firebase/firestore");
const { db } = require("../../firebase");

async function httpGetAllMembers(req, res) {
  try {
    const q = query(collection(db, "members"));
    const members = [];

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      members.push({ id: UserRecord.id, ...doc.data() });
    });

    return res.status(200).json(members);
  } catch (err) {
    return res.status(400).json({ msg: err });
  }
}

async function httpGetOneMember(req, res) {
  try {
    console.log(req);
    const memberId = req.params.id;
    const docRef = doc(db, "members", memberId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      const data = docSnap.data();
      console.log("Found Document");
      return res.status(200).json(data);
    } else {
      // docSnap.data() will be undefined in this case
      return res.status(404).json({ msg: "Document not found" });
    }
  } catch (err) {
    return res.status(400).json({ msg: err });
  }
}
//Don't need to have an update functionality, leave it for profile
async function httpUpdateMember(req, res) {
  try {
    const id = req.params.id;

    const newUsername = "Hermano";
    // const newEmail = "john@gmail.com";

    const userRef = doc(db, "members", id);

    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      await updateDoc(userRef, {
        username: newUsername,
        // email: newEmail
      });

      return res.status(200).json("Updated a record");
    } else {
      return res.status(404).json("Record was not found");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json("Internal server error");
  }
}

//Deleting
async function httpDeleteMember(req, res) {
  try{
    const id = req.params.id;
    const deluser =  doc(db, "members", id);
    
    const snapshot = await getDoc(deluser);
    
    if(snapshot.exists()){
        await deleteDoc(deluser, id);
        return res.status(200).json("Deleted a record");

    }
    else{
        return res.status(404).json("Document not found");

      }
  }catch(error){
      console.error(error);
  }
}

module.exports = {
  httpGetAllMembers,
  httpGetOneMember,
  httpUpdateMember,
  httpDeleteMember
};