import {NextResponse} from "next/server";
import {createReservation} from "@/lib/firebase/firestore";
import {reservationSchema} from "@/schemas/reservation.schema";


interface ReservationSearchParams {

}

export async function GET(request: Request, context: {params: ReservationSearchParams}) {
    try {
        return NextResponse.json({});
    } catch (e) {
        return NextResponse.json({}, {status: 500});
    }
}

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