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
        tipo: "Futbol"
    },
    {
        campusId: "ARE",
        tipo: "Basquet"
    },
    {
        campusId: "ARE",
        tipo: "Volley"
    },
    {
        campusId: "ARE",
        tipo: "Futbol"
    },
    {
        campusId: "GR",
        tipo: "Basquet"
    },
    {
        campusId: "GR",
        tipo: "Futbol"
    }
]