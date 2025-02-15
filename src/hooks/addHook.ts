import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";

export const addData = async () => {
    try {
        const docRef = await addDoc(collection(db, "users"), {
            name: "John Doe",
            email: "johndoe@example.com",
        });
        console.log("Document written with ID: ", docRef);
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
};
