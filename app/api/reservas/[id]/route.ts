import {NextResponse} from "next/server";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/nextauth/authOptions";
import {deleteReservation} from "@/lib/firebase/firestore";

export async function DELETE(request: Request, context: { params: {id?: string} }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({error: "Unauthorized"}, {status: 401});

        const id = context.params.id!;

        await deleteReservation(id);

        return NextResponse.json({id});
    } catch (e) {
        return NextResponse.json({}, {status: 500});
    }
}