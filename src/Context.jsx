import { createContext, useContext } from "react";
import { db } from "./config/firebase-config";
const GlobalContext = createContext();
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";

import {
  collection,
  addDoc, //add data
  getDocs, //read data
  deleteDoc, // delete using id/ref
  updateDoc, //update using id/reference
  doc,
  serverTimestamp,
} from "firebase/firestore";
// custom hook

export function GlobalAppContext({ children }) {
  const [remainders, setRemainder] = useState([]);

  async function addData(remainder) {
    try {
      const collectionRef = collection(db, "remainder");
      const docRef = await addDoc(collectionRef, {
        id: nanoid(),
        remainder: remainder,
        isChecked: false,
        timestamp: serverTimestamp(),
      });

      console.log(docRef.id);
      readData();
    } catch (err) {
      console.log(err);
    }
  }

  async function editRemainder(id, type, value) {
    const res = remainders.find((item) => item.id === id);
    // console.log(type, value);
    // console.log(res.isChecked);
    const editRef = doc(db, "remainder", id);
    try {
      if (type === "CHECKBOX") {
        await updateDoc(editRef, {
          isChecked: !res.isChecked,
        });
        readData();
      }

      if (type === "REMAINDER") {
        await updateDoc(editRef, {
          remainder: value,
        });
        readData();
      }
    } catch (error) {
      console.log(error);
    }
  }

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
      // console.log(remainderData);
    } catch (error) {
      console.log(error);
    }
    // console.log(remainderData);
  }

  async function deleteRemainder(id) {
    // console.log(id);
    // console.log(remainders);
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

export const useGlobalContext = () => useContext(GlobalContext);
