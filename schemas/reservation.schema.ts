import {z} from "zod";
import {ReservationStatus} from "@/types";

export const reservationSchema = z.object({
    canchaId: z.string(),
    fechaReserva: z.coerce.date()
        .min(new Date(new Date().setHours(0, 0, 0, 0))),
    horaReservaId: z.string().regex(/^M(?:1[0-3]|[0-9])$/),
    email: z.string().email().endsWith("@udla.edu.ec"),
    idBanner: z.string().startsWith('A').min(9),
    motivo: z.string().max(500),
});

export const reservationStatusSchema = z.object({
    estado: z.nativeEnum(ReservationStatus),
})