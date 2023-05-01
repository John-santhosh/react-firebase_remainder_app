import {
  collection,
  deleteDoc 
  addDoc, //add data
  getDocs, //read data
  // setDoc,
  doc,
  serverTimestamp,
  updateDoc, //update using id/reference
} from "firebase/firestore";

// add

  const collectionRef = collection(db, "remainder");

async function addData(remainder) {
  try {
    const docRef = await addDoc(collectionRef, {
      id: nanoid(),
      remainder: remainder,
      isChecked: false,
      // time: new Date(),
      timestamp: serverTimestamp(),
    });

    // console.log(docRef.id);
  } catch (err) {
    console.log(err);
  }
}

// edit
async function EditRemainder() {
  const editRef = doc(db, "remainder", "DhL7T1ph6Mql57ZhanLv");
  await updateDoc(editRef, {
    isChecked: !isChecked,
  });
}

// read

async function readData() {
  const querySnapshot = await getDocs(collectionRef);
  // const data = await querySnapshot;
  let remainderData = querySnapshot.docs.map((doc) => {
    return {
      ...doc.data(),
      id: doc.id,
    };
  });
  console.log(remainderData);
  setRemainder(remainderData);
}
