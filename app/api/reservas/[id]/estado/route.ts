import {NextResponse} from "next/server";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/nextauth/authOptions";
import {reservationStatusSchema} from "@/schemas/reservation.schema";
import {getHorario, updateReservationStatus} from "@/lib/firebase/firestore";
import {Resend} from "resend";
import {EmailTemplate} from "@/components/email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function PATCH(request: Request, context: { params: { id?: string } }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({error: "Unauthorized"}, {status: 401});

        const body = await request.json();

        const parsedReservationStatus = reservationStatusSchema.safeParse(body);

        if (!parsedReservationStatus.success) {
            return NextResponse.json({error: "Invalid data"}, {status: 400});
        }

        const id = context.params.id!;

        const updatedReservation = await updateReservationStatus(id, parsedReservationStatus.data.estado);
        const horario = await getHorario(updatedReservation.horaReservaId);

        await resend.emails.send({
            from: 'Chuviii <chuviii@chuvblocks.com>',
            to: [session.user!.email!, updatedReservation.email],
            subject: 'Actualización de estado de reserva',
            react: EmailTemplate({ reserva: {...updatedReservation, horaReserva: `${horario.inicio} - ${horario.fin}`} }),
            text: '',
        });

        return NextResponse.json({}, {status: 202});
    } catch (e) {
        console.error(e);
        return NextResponse.json({}, {status: 500});
    }
}