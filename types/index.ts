import {MouseEventHandler} from "react";
import {Timestamp} from "@firebase/firestore-types";

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
    id: string,
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

export enum ReservationStatus {
    PENDIENTE = "PENDIENTE",
    ACEPTADA = "ACEPTADA",
    RECHAZADA = "RECHAZADA",
}

export interface Reservation {
    id: string;
    canchaId: string;
    createdAt: Date;
    email: string;
    fechaReserva: Date;
    horaReservaId: string;
    idBanner: string;
    motivo: string;
}

export interface ReservationDTO {
    canchaId: string;
    createdAt: Timestamp;
    email: string;
    fechaReserva: Timestamp;
    horaReservaId: string;
    idBanner: string;
    motivo: string;
}

export interface LoginUserDTO {
    email: string;
    password: string;
}