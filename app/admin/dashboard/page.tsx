import {getReservations} from "@/lib/firebase/firestore";
import {ReservationsTable} from "./ReservationsTable";
import {ReservationStatus} from "@/types";

export const dynamic = "force-dynamic";

const Page = async () => {
    const reservations = await getReservations({estado: ReservationStatus.PENDIENTE, orderByFecha: true});

    return (
        <main className={"py-36"}>
            <div className={"container mx-auto py-10"}>
                <ReservationsTable data={reservations}/>
            </div>
        </main>
    );
};

export default Page;