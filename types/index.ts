import {MouseEventHandler} from "react";

export interface CustomButtonProps {
    title: string;
    containerStyles?: string;
    handleClick?: MouseEventHandler<HTMLButtonElement>;
    btnType?: "button" | "submit";
}

export interface Campus {
    id: string;
    nombre: string;
    imagenURL: string;
}

export interface Cancha {
    campusId: string;
    tipo: "Futbol" | "Basquet" | "Volley";
}