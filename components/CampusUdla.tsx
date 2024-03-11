import Image from "next/image";
import {campus} from "@/constants";
import Link from "next/link";

const CampusUdla = () => {
    return (
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 place-content-center text-white font-extrabold text-xl">
            {campus.map((campus) => (
                <Link key={campus.id} href={`/canchas/${campus.id}`}>
                    <div
                         className="relative flex justify-center items-center p-4 rounded-lg overflow-hidden min-h-[250px]">
                        <Image src={campus.imagenURL} alt={`${campus.nombre} portada`} fill
                               sizes={"(max-width: 940px), (max-width: 307px)"}
                               className={"object-cover absolute inset-0 -z-10 brightness-75"}/>
                        <p>{campus.nombre}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default CampusUdla;
