import Link from "next/link";
import Image from "next/image";

const NavBar = () => {
    return (
        <header className={"w-full fixed z-10 bg-black-200"}>
            <nav className={"max-w[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4"}>
                <Link href={"/"} className={"flex justify-center items-center"}>
                    <Image src={"/logo_clubes_udla_blanco.png"} alt={"Udla Logo"} width={115} height={51}
                           className={"object-contain"}/>
                </Link>
                <div className={"flex flex-row gap-5 font-bold"}>
                    <Link href={"/"} className={"navbar__link"}>
                        Inicio
                    </Link>
                    <Link href={"/reservar"} className={"navbar__link"}>
                        Reservar
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default NavBar;