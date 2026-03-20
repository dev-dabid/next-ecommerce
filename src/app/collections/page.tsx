import Breadcrumb from "@/components/Breadcrumb";
import FilterDropdown from "./FilterDropdown";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <div className="">
      <div className="max-w-300 mx-auto h-screen">
        <Breadcrumb />
        <div className="mb-10">
          <div>
            <h1 className="text-[clamp(1.9rem,5vw,3rem)] font-bold mb-2">
              Summer Essentials
            </h1>
            <p className="text-[clamp(1rem,2vw,1.125rem)] max-w-[30ch] md:max-w-[53ch]">
              Curated selection of premium pieces designed for light, airy
              comfort and timeless style.
            </p>
          </div>
        </div>

        <div className="hidden md:flex gap-5">
          <FilterDropdown title={"Category"} />
          <FilterDropdown title={"Price Range"} />
          <FilterDropdown title={"Color"} />
          <FilterDropdown title={"Material"} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
