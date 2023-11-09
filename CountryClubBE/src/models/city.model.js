const { onSnapshot } = require("firebase/firestore");
const {
  doc,
  db,
  setDoc,
  addDoc,
  collection,
  query,
  getDocs,
} = require("../firebase/index");

class City {
  constructor(name, state, country) {
    this.name = name;
    this.state = state;
    this.country = country;
  }
  toString() {
    return this.name + ", " + this.state + ", " + this.country;
  }
}

// Firestore data converter
const cityConverter = {
  toFirestore: (city) => {
    return {
      name: city.name,
      state: city.state,
      country: city.country,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new City(data.name, data.state, data.country);
  },
};

async function addRecord(city, country) {
  const ref = await addDoc(collection(db, "school"), {
    name: city,
    country,
  });
}

async function addStudent(student_id, name, email, age, country) {
  const ref = await addDoc(collection(db, "students"), {
    name,
    country,
    email,
    age,
    student_id,
  });
}

async function getAllCities() {

  const q = query(collection(db, "citie"));

  const querySnapshot = await getDocs(q);
  const citiesList = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return citiesList;
}

module.exports = {
  addRecord,
  getAllCities,
  addStudent
};
