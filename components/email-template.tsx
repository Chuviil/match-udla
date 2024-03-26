import React from "react";
import {Reservation} from "@/types";

interface EmailTemplateProps {
    reserva: Reservation
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
                                                                          reserva,
                                                                      }) => (
    <div>
        <h1>Hola</h1>
        <p>El estado de tu reserva para el dia: {reserva.fechaReserva.toLocaleDateString()} ha sido actualizado. El nuevo
            estado es: {reserva.estado}.</p>
        <p>¡Gracias por utilizar nuestro servicio!</p>
    </div>
);