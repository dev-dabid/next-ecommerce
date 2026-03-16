const NewsLetterInput = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-2 w-full">
      <div className="bg-white py-4 px-4 rounded-xl lg:flex-1">
        <input
          className="w-full outline-none"
          type="text"
          placeholder="Enter your email address"
        />
      </div>
      <button className="bg-gray-900 text-white px-[clamp(1.5rem,2vw,2.5rem)] text-sm rounded-xl font-semibold py-4">
        Subscribe Now
      </button>
    </div>
  );
};

export default NewsLetterInput;
