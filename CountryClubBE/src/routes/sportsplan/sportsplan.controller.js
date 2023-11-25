const {
  addDoc,
  collection,
  query,
  getDocs,
  getDoc,
  doc,
} = require("firebase/firestore");
const { db } = require("../../firebase");

async function httpAddSportsplan(req, res) {
  try {
    const data = req.body;
    await addDoc(collection(db, "sportsplan"), data);
    return res.status(201).json({ msg: "Added sportsplan" });
  } catch (err) {
    return res.status(400).json({ msg: err });
  }
}

async function httpGetAllSportsplan(req, res) {
  try {
    const q = query(collection(db, "sportsplan"));
    const sportsplans = [];

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      sportsplans.push({ id: doc.id, ...doc.data() });
    });

    return res.status(200).json(sportsplans);
  } catch (err) {
    return res.status(400).json({ msg: err });
  }
}

async function httpGetOneSportsplan(req, res) {
  try {
    console.log(req);
    const sportsplanId = req.params.id;
    const docRef = doc(db, "sportsplan", sportsplanId);
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

module.exports = {
  httpAddSportsplan,
  httpGetAllSportsplan,
  httpGetOneSportsplan,
};
