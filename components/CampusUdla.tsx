import Image from "next/image";

const CampusUdla = () => {
    return (
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 place-content-center text-white font-extrabold text-xl">
            <div className="relative flex justify-center items-center p-4 rounded-lg overflow-hidden min-h-[250px]">
                <Image src={"/UP_display.png"} alt={"Campus UdlaPark"} fill className={"object-cover absolute inset-0 -z-10 brightness-75"}/>
                <p>Reserva Campus UdlaPark</p>
            </div>
            <div className="relative flex justify-center items-center p-4 rounded-lg overflow-hidden min-h-[250px]">
                <Image src={"/GR_display.png"} alt={"Campus Granados"} fill className={"object-cover absolute inset-0 -z-10 brightness-75"}/>
                <p>Reserva Campus Granados</p>
            </div>
            <div className="relative flex justify-center items-center p-4 rounded-lg overflow-hidden min-h-[250px]">
                <Image src={"/AR_display.png"} alt={"Udla Arena"} fill className={"object-cover absolute inset-0 -z-10 brightness-75"}/>
                <p>Reserva Udla Arena</p>
            </div>
        </div>
    );
};

export default CampusUdla;
