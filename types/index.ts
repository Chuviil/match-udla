import {MouseEventHandler} from "react";

export interface CustomButtonProps {
    title: string;
    containerStyles?: string;
    handleClick?: MouseEventHandler<HTMLButtonElement>;
    btnType?: "button" | "submit";
}

export interface Campus {
    id: "UP" | "GR" | "ARE";
    nombre: string;
    imagenURL: string;
}

export interface Cancha {
    campusId: "UP" | "GR" | "ARE";
    tipo: "Futbol" | "Basquet" | "Volley";
    imagenURL: string;
}

export interface ReservaPageProps {
    searchParams: {
        cancha: "Futbol" | "Basquet" | "Volley";
    };
    params: {
        id: "UP" | "GR" | "ARE";
    };
}