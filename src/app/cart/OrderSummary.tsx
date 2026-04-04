type OrderSummaryProps = {};

const OrderSummary = () => {
  return (
    <div className="p-6 max-w-100 w-full bg-white h-fit rounded-2xl">
      <div className="flex flex-col">
        <h1 className="text-xl font-semibold mb-5">Order Summary</h1>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <p className="text-gray-500">Subtotal</p>
            <p className="font-semibold">$768.00</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-500">Shipping</p>
            <p className="font-semibold text-sky-400">FREE</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-500">Estimated Tax</p>
            <p className="font-semibold">$61.44</p>
          </div>

          <div className="py-2 border-t border-t-sky-200">
            <div className="flex justify-between">
              <p className="text-lg font-semibold">Total</p>
              <p className="text-2xl text-sky-500 font-bold">$829.00</p>
            </div>
          </div>

          <div>
            <div className="flex border border-sky-200 rounded-lg p-2">
              <input
                className="px-2 w-full outline-none"
                placeholder="Promo code"
                type="text"
              />
              <button className="text-sky-500 bg-sky-100 py-1 px-2 rounded">
                Apply
              </button>
            </div>
          </div>

          <button className="text-white bg-sky-400 py-4 rounded-xl mt-2">
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
