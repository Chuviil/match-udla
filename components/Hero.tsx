import Image from "next/image";

function Hero() {
    const handleScroll = () => {

    };

    return (
        <div className="relative w-full">
            <div className="absolute inset-0 z-0">
                <Image
                    src="/futbol_bg.png"
                    alt="Fondo de personas jugando futbol"
                    fill
                    priority
                    aria-disabled={true}
                    className={"object-cover"}
                />
            </div>
            <div className="hero relative z-10 text-white text-center">
                <div className="flex-1 py-36 padding-x">
                    <h1 className="hero__title">
                        ¡Descubre, reserva y juega - fácil y rápido!
                    </h1>
                    <p className="hero__subtitle">
                        Simplifica tu experiencia de reserva de canchas con un proceso de reserva sencillo.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Hero;
