import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import KeycloakProvider from "next-auth/providers/keycloak";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text", placeholder: "josue.quito@udla.edu.ec" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const q =
                    query(collection(db, "usuarios"), where("email", "==", credentials!.email));

                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) return null;

                const foundUser = querySnapshot.docs[0];

                const foundUserData = foundUser.data();

                if (foundUserData.password !== credentials!.password) return null;

                // Return a normalized user object
                return { id: foundUser.id, email: foundUserData.email, name: foundUserData.name || "", provider: "credentials" };
            }
        }),
        KeycloakProvider({
            clientId: process.env.KEYCLOAK_ID || "next-auth-canchas",
            clientSecret: process.env.KEYCLOAK_SECRET || "",
            issuer: process.env.KEYCLOAK_ISSUER || "",
            profile(profile) {
                // Normalize Keycloak profile to match your user structure
                return {
                    id: profile.sub,
                    email: profile.email,
                    name: profile.name || profile.preferred_username || "",
                    provider: "keycloak"
                };
            }
        })
    ],
    callbacks: {
        async session({ session, token, user }) {
            // Attach user id and provider to session
            if (token) {
                session.user = {
                    ...session.user,
                    id: (token as any).sub || (token as any).id,
                    provider: (token as any).provider || user?.provider
                };
            }
            return session;
        },
        async jwt({ token, user, account, profile }) {
            // Attach id and provider to JWT token
            if (user) {
                token.id = (user as any).id;
                token.provider = (user as any).provider;
            }
            return token;
        }
    }
}