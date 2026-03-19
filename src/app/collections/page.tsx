import FilterDropdown from "./FilterDropdown";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <div className="">
      <div className="max-w-300 mx-auto h-screen">
        <div className="mb-10">
          <div>
            <h1 className="text-5xl font-bold mb-2">Summer Essentials</h1>
            <p className="text-lg max-w-[55ch]">
              Curated selection of premium pieces designed for light, airy
              comfort and timeless style.
            </p>
          </div>
        </div>

        <div className="">
          <FilterDropdown />
        </div>
      </div>
      <Footer />
    </div>
  );
}
