import Link from "next/link";
import Image from "next/image";
import CustomButton from "./CustomButton";

const NavBar = () => {
    return (
        <header className={"w-full fixed z-10 bg-black-200"}>
            <nav className={"max-w[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4"}>
                <Link href={"/"} className={"flex justify-center items-center"}>
                    <Image src={"/udla_logo_blanco.png"} alt={"Udla Logo"} width={120} height={20} className={"object-contain"}/>
                </Link>
                <div className={"flex flex-row gap-5 font-bold"}>
                    <CustomButton title={"Inicio"}
                                  containerStyles={"hover:border-gray-100 hover:border text-white rounded-full min-w-[130px]"}/>
                    <CustomButton title={"Reservar"}
                                  containerStyles={"hover:border-gray-100 hover:border text-white rounded-full min-w-[130px]"}/>
                </div>
            </nav>
        </header>
    );
};

export default NavBar;