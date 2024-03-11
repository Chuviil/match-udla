import React from 'react';
import {ReservaPageProps} from "@/types";

const ReservaPage = ({searchParams, params}: ReservaPageProps) => {
    return (
        <div className={"h-screen flex justify-center items-center"}>
            <p>Se esta reservando en {params.id} la cancha de {searchParams.cancha}</p>
        </div>
    );
};

export default ReservaPage;