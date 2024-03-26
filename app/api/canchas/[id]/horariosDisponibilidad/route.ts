import {NextRequest, NextResponse} from "next/server";
import {getHorarios, getReservations} from "@/lib/firebase/firestore";
import {TipoCancha} from "@/types";

export async function GET(request: NextRequest, context: { params: { id?: string } }) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const canchaId = context.params.id!;
        const date = searchParams.get('fecha');
        const tipoCancha = searchParams.get('tipoCancha') as TipoCancha;
        if (!date || !tipoCancha) {
            return NextResponse.json({error: "Invalid data"}, {status: 400});
        }
        const reservations = await getReservations({date: new Date(date), canchaId, tipoCancha});
        const horarios = await getHorarios();

        const horariosDisponibilidad = horarios.map(horario => ({
            ...horario,
            disponible: !reservations.some(reservation => reservation.horaReservaId === horario.id),
        }));

        return NextResponse.json(horariosDisponibilidad);
    } catch (e) {
        return NextResponse.json({}, {status: 500});
    }
}