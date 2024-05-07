import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    orderBy,
    query,
    Query,
    updateDoc,
    where
} from "firebase/firestore";
import {db} from "./firebase";
import {Horario, HorarioFirebaseDTO, Reservation, ReservationDTO, ReservationStatus, TipoCancha} from "@/types";

export async function createReservation(data: any) {
    const docRef = await addDoc(
        collection(db, "reservas"),
        {...data, createdAt: new Date(), estado: ReservationStatus.PENDIENTE}
    );
    return docRef.id;
}

interface ReservationQueryFilters {
    canchaId?: string,
    estado?: ReservationStatus,
    date?: Date
    tipoCancha?: TipoCancha,
    orderByFecha?: boolean,
}

function applyQueryFilters(q: Query, {date, estado, tipoCancha, canchaId, orderByFecha}: ReservationQueryFilters): Query {
    if (canchaId) {
        q = query(q, where("canchaId", "==", canchaId));
    }
    if (date) {
        q = query(q, where("fechaReserva", "==", date));
    }
    if (estado) {
        q = query(q, where("estado", "==", estado));
    }
    if (tipoCancha) {
        q = query(q, where("tipoCancha", "==", tipoCancha));
    }
    if (orderByFecha) {
        q = query(q, orderBy("fechaReserva"));
    }
    return q;
}

export async function getReservations(filters?: ReservationQueryFilters): Promise<Reservation[]> {
    let qReservas = query(collection(db, "reservas"));
    let qHorarios = query(collection(db, "horarios"));

    if (filters) {
        qReservas = applyQueryFilters(qReservas, filters)
    }

    const [reservasResults, horariosResults] = await Promise.all([
        getDocs(qReservas),
        getDocs(qHorarios)
    ]);

    const horarios = horariosResults.docs.map(doc => {
        const data = doc.data() as Horario;
        return {
            ...data,
            id: doc.id,
        };
    });

    return reservasResults.docs.map(doc => {
        const data = doc.data() as ReservationDTO;
        const horario = horarios.find(h => h.id === data.horaReservaId);
        return {
            ...data,
            id: doc.id,
            createdAt: data.createdAt.toDate(),
            fechaReserva: data.fechaReserva.toDate(),
            horaReserva: horario ? `${horario.inicio} - ${horario.fin}` : 'N/A',
        };
    });
}

export async function deleteReservation(reservationId: string) {
    await deleteDoc(doc(db, "reservas", reservationId));
    return reservationId;
}

export async function updateReservationStatus(reservationId: string, status: string): Promise<Reservation> {
    const reservationRef = doc(db, "reservas", reservationId);
    if (reservationRef) {
        await updateDoc(reservationRef, {estado: status});
    }

    const reservationSnap = await getDoc(reservationRef);

    const reservationData = reservationSnap.data() as ReservationDTO;

    return {
        ...reservationData,
        id: reservationSnap.id,
        fechaReserva: reservationData.fechaReserva.toDate(),
        createdAt: reservationData.createdAt.toDate(),
    }
}

export async function getHorarios(): Promise<Horario[]> {
    let q = query(collection(db, "horarios"), orderBy("inicio"));

    const results = await getDocs(q);
    return results.docs.map(doc => {
        const data = doc.data() as HorarioFirebaseDTO;
        return {
            ...data,
            id: doc.id,
        };
    });
}