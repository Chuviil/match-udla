import {campus, canchas} from "@/constants";
import Image from "next/image";
import Link from "next/link";

interface CanchasPageProps {
    params: {
        id: string;
    }
}

const CanchasPage = ({params}: CanchasPageProps) => {
    const canchasDisponibles = canchas.filter(cancha => cancha.campusId === params.id);
    const campusInfo = campus.find(campus => campus.id === params.id);
    return (
        <div className={"overflow-hidden"}>
            <div className={"relative w-full text-white"}>
                <div className="absolute inset-0 z-0">
                    <Image
                        src={campusInfo?.imagenURL || "/futbol_bg.png"}
                        alt="Fondo de personas jugando futbol"
                        fill
                        priority
                        aria-disabled={true}
                        className={"object-cover brightness-75"}
                    />
                </div>
                <div
                    className={"flex xl:flex-row flex-col gap-5 max-w-[1440px] mx-auto relative text-center"}>
                    <div className="flex-1 py-36 padding-x">
                        <h1 className="hero__title">
                            {campusInfo?.nombre}
                        </h1>
                    </div>
                </div>
            </div>
            <div className={"my-12 py-4 lg:py-0 lg:px-0 px-6 max-width"}>
                <div
                    className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 place-content-center text-white font-extrabold text-xl">
                    {canchasDisponibles.map((cancha) => (
                        <div key={cancha.tipo} className={"relative flex flex-col gap-2"}>
                            <div
                                className={"relative flex justify-center items-center p-4 rounded-lg overflow-hidden min-h-[250px]"}>
                                <Image src={cancha.imagenURL}
                                       alt={`${campusInfo?.nombre} Cancha de ${cancha.tipo} portada`} fill
                                       sizes={"(max-width: 940px), (max-width: 307px)"}
                                       className={"object-cover absolute inset-0 -z-10 brightness-75"}/>
                                <p>Canchas {cancha.tipo}</p>
                            </div>
                            <Link className={"bg-black-100 rounded-lg py-2 w-full text-center"}
                                  href={`/canchas/${campusInfo?.id}/reservar?cancha=${cancha.tipo}`}>
                                Reservar
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CanchasPage;