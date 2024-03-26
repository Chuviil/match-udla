import {Campus, Cancha, TipoCancha} from "@/types";

export const campus: Campus[] = [
    {
        id: "UP",
        nombre: "UdlaPark",
        imagenURL: "/UP_display.png"
    },
    {
        id: "GR",
        nombre: "Granados",
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
        id: "UP-CHF",
        campusId: "UP",
        tipo: "Futbol",
        deportes: [TipoCancha.FUTBOL],
        imagenURL: "/UP_cancha_futbol.jpg"
    },
    {
        id: "ARE-CHM",
        campusId: "ARE",
        tipo: "Multiple",
        deportes: [TipoCancha.FUTBOL, TipoCancha.BASQUET, TipoCancha.VOLLEY],
        imagenURL: "/ARE_cancha.jpg"
    },
    {
        id: "GR-CHB",
        campusId: "GR",
        tipo: "Basquet/Volley",
        deportes: [TipoCancha.BASQUET, TipoCancha.VOLLEY],
        imagenURL: "/GR_cancha_basquet.jpeg"
    },
    {
        id: "GR-CHF",
        campusId: "GR",
        tipo: "Futbol",
        deportes: [TipoCancha.FUTBOL],
        imagenURL: "/GR_cancha_futbol.jpeg"
    },
]

export const horariosDisponibles = [
    {
        id: "M0",
        inicio: "07:00",
        fin: "08:00",
    },
    {
        id: "M1",
        inicio: "08:05",
        fin: "09:05",
    },
    {
        id: "M2",
        inicio: "09:10",
        fin: "10:10",
    },
    {
        id: "M3",
        inicio: "10:15",
        fin: "11:15",
    },
    {
        id: "M4",
        inicio: "11:20",
        fin: "12:20",
    },
    {
        id: "M5",
        inicio: "12:25",
        fin: "13:25",
    },
    {
        id: "M6",
        inicio: "13:30",
        fin: "14:30",
    },
    {
        id: "M7",
        inicio: "14:35",
        fin: "15:35",
    },
    {
        id: "M8",
        inicio: "15:40",
        fin: "16:40",
    },
    {
        id: "M9",
        inicio: "16:45",
        fin: "17:45",
    },
    {
        id: "M10",
        inicio: "17:50",
        fin: "18:50",
    },
    {
        id: "M11",
        inicio: "18:50",
        fin: "19:50",
    },
];

export const tiposCancha = [
    {
        id: "Futbol",
        nombre: "Futbol"
    },
    {
        id: "Basquet",
        nombre: "Basquet"
    },
    {
        id: "Volley",
        nombre: "Volley"
    },
    {
        id: "Multiple",
        nombre: "Multiple"
    }
]