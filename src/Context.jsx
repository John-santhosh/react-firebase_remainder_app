import { createContext, useContext } from "react";
import { db } from "./config/firebase-config";
const GlobalContext = createContext();
import { nanoid } from "nanoid";
import { useState } from "react";

import {
  collection, //READ & ADD DATA
  addDoc, //add data
  getDocs, //read data
  deleteDoc, // delete using id/ref
  updateDoc, //update using id/reference
  doc, // DELETE & EDIT DATA
  serverTimestamp,
} from "firebase/firestore";

export function GlobalAppContext({ children }) {
  const [remainders, setRemainder] = useState([]);

  // Read data
  async function readData() {
    const collectionRef = collection(db, "remainder");
    try {
      const querySnapshot = await getDocs(collectionRef);
      let remainderData = querySnapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        };
      });
      setRemainder(remainderData);
      console.log(remainders);
    } catch (error) {
      console.log(error);
    }
  }

  // add-Data
  async function addData(remainder) {
    try {
      const collectionRef = collection(db, "remainder");
      const docRef = await addDoc(collectionRef, {
        // we don't have to specify an ID , addDoc() will automatically create it
        id: nanoid(),
        remainder: remainder,
        isChecked: false,
        timestamp: serverTimestamp(),
      });
      // console.log(docRef);
      readData();
    } catch (err) {
      console.log(err);
    }
  }

  // edit data
  async function editRemainder(id, action, value) {
    const res = remainders.find((item) => item.id === id);
    const editRef = doc(db, "remainder", id);
    try {
      if (action === "CHECKBOX") {
        await updateDoc(editRef, {
          isChecked: !res.isChecked,
          timestamp: serverTimestamp(),
        });
        readData();
      }

      if (action === "REMAINDER") {
        await updateDoc(editRef, {
          remainder: value,
          timestamp: serverTimestamp(),
        });
        readData();
      }
    } catch (error) {
      console.log(error);
    }
  }

  // DELETE DATA
  async function deleteRemainder(id) {
    const res = remainders.filter((item) => item.id !== id);
    console.log(res);
    await deleteDoc(doc(db, "remainder", id));
    readData();
  }

  return (
    <GlobalContext.Provider
      value={{
        addData,
        editRemainder,
        readData,
        deleteRemainder,
        remainders,
        setRemainder,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

// custom hook
export const useGlobalContext = () => useContext(GlobalContext);
