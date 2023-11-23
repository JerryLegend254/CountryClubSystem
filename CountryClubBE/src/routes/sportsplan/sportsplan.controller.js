const { addDoc, collection, query, getDocs, getDoc, doc, deleteDoc, updateDoc } = require("firebase/firestore");
const { db } = require("../../firebase");

async function httpAddSportsplan(req, res) {
    try {
        const data = req.body
        await addDoc(collection(db, "sportsplan"), data);
        return res.status(201).json({ msg: "Added sportsplan" })
    } catch (err) {

        return res.status(400).json({ msg: err })
    }

}

async function httpGetAllSportsplan(req, res) {
    try {
        const q = query(collection(db, "sportsplan"));
        const sportsplans = []

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            sportsplans.push({ id: doc.id, ...doc.data() })
        });

        return res.status(200).json(sportsplans)
    } catch (err) {

        return res.status(400).json({ msg: err })
    }

}


async function httpGetOneSportsplan(req, res) {
    try {
        console.log(req)
        const sportsplanId = req.params.id
        const docRef = doc(db, "sportsplan", sportsplanId);
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

async function httpDeleteSportsplan(req, res) {
    try{
        const id = req.params.id;
        const removeUser=  doc(db, "sportsplan", id);
        
        const snapshot = await getDoc(removeUser);
        
        if(snapshot.exists()){
            await deleteDoc(removeUser, id);
            return res.status(200).json("Deleted a record");
    
        }
        else{
            return res.status(404).json("Document not found");
    
          }
      }catch(error){
          console.error(error);
      }

}
async function httpUpdateSportsplan(req, res) {
    try {
        const sportsplanId = req.params.id
        const sportsplan = req.body
        const docRef = doc(db, "sportsplan", sportsplanId);

        const userChange = await getDoc(docRef);
        if (userChange.exists()) {
            await updateDoc(docRef, sportsplan);
            return res.status(200).json({ msg: "Updated" });
        } else {
            return res.status(404).json("Could not find the Record");
        }

    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Server error" });
    }



}


module.exports = {
    httpAddSportsplan, httpGetAllSportsplan, httpGetOneSportsplan, httpDeleteSportsplan, httpUpdateSportsplan
}