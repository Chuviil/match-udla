import {NextResponse} from "next/server";
import {z} from "zod";
import {createReservation} from "@/lib/firebase/firestore";

const reservationSchema = z.object({
    canchaId: z.string(),
    fechaReserva: z.coerce.date()
        .min(new Date(new Date().setHours(0, 0, 0, 0))),
    horaReservaId: z.string().regex(/^M(?:1[0-3]|[0-9])$/),
    email: z.string().email().endsWith("@udla.edu.ec"),
    idBanner: z.string().startsWith('A'),
    motivo: z.string().max(500),
})

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const parsedReservation = reservationSchema.safeParse(body);
        if (!parsedReservation.success) {
            return NextResponse.json({error: "Invalid data"}, {status: 400});
        }
        const newReservation = await createReservation(parsedReservation.data);
        return NextResponse.json({id: newReservation}, {status: 201});
    } catch (e) {
        return NextResponse.json({}, {status: 500});
    }
}