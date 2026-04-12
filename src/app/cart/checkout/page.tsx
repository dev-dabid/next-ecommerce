import Breadcrumb from "@/components/Breadcrumb";
import TitledInput from "./TitledInput";

export default function Checkout() {
  return (
    <div>
      <div className="max-w-300 mx-auto">
        <Breadcrumb />
        <h1 className="text-4xl font-bold mb-10">Checkout</h1>
        <div className="flex justify-between">
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold">Shipping Address</h2>
            <div className="mt-5">
              <div className="flex gap-4">
                <TitledInput title={"First Name"} />
                <TitledInput title={"Last Name"} />
              </div>
              <div className="mt-4">
                <TitledInput title="Address" />
              </div>
              <div className="flex gap-4 mt-4">
                <TitledInput title={"City"} />
                <TitledInput title={"Postal Code"} />
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
