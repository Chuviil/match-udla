import {addDoc, collection} from "firebase/firestore";
import {db} from "./firebase";

export async function createReservation(data: any) {
    const docRef = await addDoc(
        collection(db, "reservas"),
        {...data, createdAt: new Date(), estado: "PENDIENTE"}
    );
    return docRef.id;
}