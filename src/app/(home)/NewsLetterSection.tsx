import NewsLetterInput from "./NewsLetterInput";

const NewsLetterSection = () => {
  return (
    <div className="py-[clamp(1rem,5vw,5rem)]">
      <div className="max-w-300 mx-auto bg-sky-400 flex justify-center items-center rounded-2xl py-[clamp(1rem,5vw,5rem)] flex-col px-5">
        <h1 className="text-[clamp(1.25rem,6vw,3rem)] font-bold">
          Join the Lumina Collective
        </h1>
        <p className="mt-2 text-[clamp(0.75rem,2vw,1.25rem)] max-w-[60ch] text-center">
          Subscribe to receive first access to new arrivals, private sales, and
          fashion inspiration.
        </p>
        <div className="max-w-180 w-full mt-10">
          <NewsLetterInput />
        </div>
        <p className="mt-4 text-center text-[clamp(0.75rem,2vw,0.8rem)] text-gray-500">
          By subscribing, you agree to our Privacy Policy ang Terms of Service
        </p>
      </div>
    </div>
  );
};

export default NewsLetterSection;
