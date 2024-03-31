import {z} from "zod";
import {ReservationStatus, TipoCancha} from "@/types";

export const reservationSchema = z.object({
    canchaId: z.string(),
    tipoCancha: z.nativeEnum(TipoCancha),
    fechaReserva: z.coerce.date()
        .min(new Date(new Date().setHours(0, 0, 0, 0))),
    horaReservaId: z.string().regex(/^M(?:1[0-3]|[0-9])$/),
    email: z.string().email().endsWith("@udla.edu.ec"),
    idBanner: z.string().regex(/^A\d{8}$/),
    motivo: z.string().max(500),
});

export const reservationStatusSchema = z.object({
    estado: z.nativeEnum(ReservationStatus),
})