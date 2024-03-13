import {CampusUdla, Hero} from "@/components/index";

export default function Home() {
    return (
        <main className="overflow-hidden">
            <Hero/>
            <div className={"my-12 py-4 lg:py-0 lg:px-0 px-6 max-width"}>
                <CampusUdla/>
            </div>
        </main>
    );
}
