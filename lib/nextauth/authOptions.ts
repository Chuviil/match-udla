import type {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {collection, getDocs, query, where} from "firebase/firestore";
import {db} from "@/lib/firebase/firebase";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {label: "Email", type: "text", placeholder: "josue.quito@udla.edu.ec"},
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials, req) {
                const q =
                    query(collection(db, "usuarios"), where("email", "==", credentials!.email));

                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) return null;

                const foundUser = querySnapshot.docs[0];

                const foundUserData = foundUser.data();

                if (foundUserData.password !== credentials!.password) return null;

                return {id: foundUser.id, email: foundUserData.email};
            }
        })
    ],
}