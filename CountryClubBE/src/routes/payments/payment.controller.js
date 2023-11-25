const { addDoc, collection, query, getDocs, getDoc, doc } = require("firebase/firestore");
const { db } = require("../../firebase");

async function httpAddPayment(req, res) {
    try {
        const data = req.body
        await addDoc(collection(db, "payments"), data);
        return res.status(201).json({ msg: "Added payment" })
    } catch (err) {

        return res.status(400).json({ msg: err })
    }

}

async function httpGetAllPayments(req, res) {
    try {
        const q = query(collection(db, "payments"));
        const payments = []

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            payments.push({id: doc.id, name: doc.id , ...doc.data()})
        });

        return res.status(200).json(payments)
    } catch (err) {

        return res.status(400).json({ msg: err })
    }

}


async function httpGetOnePayment(req, res) {
    try {
        const paymentId = req.params.id
        const docRef = doc(db, "payments", paymentId);
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
    httpAddPayment, httpGetAllPayments, httpGetOnePayment
}