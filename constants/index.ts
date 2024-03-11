import {Campus, Cancha} from "@/types";

export const campus: Campus[] = [
    {
        id: "UP",
        nombre: "Campus UdlaPark",
        imagenURL: "/UP_display.png"
    },
    {
        id: "GR",
        nombre: "Campus Granados",
        imagenURL: "/GR_display.png"
    },
    {
        id: "ARE",
        nombre: "Udla Arena",
        imagenURL: "/ARE_display.png"
    }
]

export const canchas: Cancha[] = [
    {
        campusId: "UP",
        tipo: "Futbol",
        imagenURL: "/UP_cancha_futbol.png"
    },
    {
        campusId: "ARE",
        tipo: "Basquet",
        imagenURL: "/ARE_cancha.jpg"
    },
    {
        campusId: "ARE",
        tipo: "Volley",
        imagenURL: "/ARE_cancha.jpg"
    },
    {
        campusId: "ARE",
        tipo: "Futbol",
        imagenURL: "/ARE_cancha.jpg"
    },
    {
        campusId: "GR",
        tipo: "Basquet",
        imagenURL: "/GR_cancha_basquet.jpeg"
    },
    {
        campusId: "GR",
        tipo: "Futbol",
        imagenURL: "/GR_cancha_futbol.jpeg"
    }
]