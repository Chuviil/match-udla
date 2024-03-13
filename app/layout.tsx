import type {Metadata} from "next";
import "./globals.css";
import {Footer, NavBar} from "@/components/index";
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
    title: "Clubes | Reserva de Canchas",
    description: "Aplicación para la reserva de canchas de la Universidad de las Américas",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={"relative"}>
        <NavBar/>
        {children}
        <Footer />
        <Toaster />
        </body>
        </html>
    );
}
