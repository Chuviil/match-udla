import {NextResponse} from "next/server";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {reservationStatusSchema} from "@/schemas/reservation.schema";
import {updateReservationStatus} from "@/lib/firebase/firestore";

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

        await updateReservationStatus(id, parsedReservationStatus.data.estado);

        return NextResponse.json({}, {status: 202});
    } catch (e) {
        return NextResponse.json({}, {status: 500});
    }
}