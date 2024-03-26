import React from 'react';
import {ReservaPageProps} from "@/types";
import {campus, canchas} from "@/constants";
import Image from "next/image";
import {ScheduleSelectionForm} from "@/components/index";
import {notFound} from "next/navigation";

const ReservaPage = ({searchParams, params}: ReservaPageProps) => {
    const campusInfo = campus.find(campus => campus.id === params.id);
    const canchaInfo = canchas.find(cancha => cancha.tipo === searchParams.cancha && cancha.campusId === params.id);

    if (!campusInfo || !canchaInfo) {
        notFound();
    }

    return (
        <main className={"overflow-hidden"}>
            <div className={"min-h-screen pt-16 grid grid-cols-1 md:grid-cols-2 m-5 sm:my-5 md:m-0"}>
                <div className={"text-center flex flex-col gap-4 justify-center items-center"}>
                    <h1 className={"text-3xl font-extrabold"}>{campusInfo?.nombre}</h1>
                    <div className={"relative w-[400px] h-[250px]"}>
                        <Image src={canchaInfo?.imagenURL || "/futbol.bg"}
                               alt={`Cancha de ${canchaInfo?.tipo} portada`}
                               sizes={"(max-width: 400px), (max-width: 250px)"} className={"object-cover"} fill/>
                    </div>
                    <p>Cancha {canchaInfo?.tipo}</p>
                </div>
                <div className={"flex justify-center items-center"}>
                    <ScheduleSelectionForm canchaId={canchaInfo?.id || "INV-123"} tiposCancha={canchaInfo.deportes || []}/>
                </div>
            </div>
        </main>
    );
};

export default ReservaPage;