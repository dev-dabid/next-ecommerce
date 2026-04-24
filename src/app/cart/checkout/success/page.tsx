export default function Success() {
  return (
    <div className="max-w-300 mx-auto">
      <div className="flex justify-center my-10">
        <h1 className="text-6xl font-semibold">THANK YOU FOR YOUR ORDER!</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-6 grid-rows-3 gap-4 p-6 h-screen">
        <div className="md:col-span-4 md:row-span-3 bg-white rounded-3xl p-6 text-white flex flex-col justify-end">
          <div>
            <div className="grid"></div>
          </div>
        </div>

        <div className="md:col-span-2  bg-orange-400 rounded-3xl p-6 text-white">
          <h2 className="text-xl font-semibold">Wide Feature</h2>
        </div>

        <div className="md:col-span-2  bg-zinc-800 rounded-3xl p-6 text-white">
          <h2 className="text-lg font-medium">Stats</h2>
        </div>
        <div className="md:col-span-2  bg-zinc-800 rounded-3xl p-6 text-white">
          <h2 className="text-lg font-medium">Stats</h2>
        </div>
      </div>
    </div>
  );
}
