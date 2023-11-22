const { UserRecord } = require("firebase-admin/auth");
const { getDocs, collection, getDoc, query } = require("firebase/firestore");
const { db } = require("../../firebase");

async function httpGetAllMembers(req, res) {
    try {
        const q = query(collection(db, "members"));
        const sportsplan = []

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            sportsplan.push({id: UserRecord.id, ...doc.data()})
        });

        return res.status(200).json(sportsplan)
    } catch (err) {

        return res.status(400).json({ msg: err })
    }

}

async function httpGetOneMember(req, res) {
    try {
        console.log(req)
        const sportsplanId = req.params.id
        const docRef = doc(db, "members", sportsplanId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          const data = docSnap.data()
          console.log("Found Document")
          return res.status(200).json(data)
        } else {
          // docSnap.data() will be undefined in this case
          return res.status(404).json({ msg: "Document not found" })
        }

        
    } catch (err) {

        return res.status(400).json({ msg: err })
    }

}

module.exports = {
    httpGetAllMembers, httpGetOneMember
}