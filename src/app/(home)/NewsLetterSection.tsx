import NewsLetterInput from "./NewsLetterInput";

const NewsLetterSection = () => {
  return (
    <div className="py-20">
      <div className="max-w-300 mx-auto bg-sky-400 flex justify-center items-center rounded-2xl py-20 flex-col px-5">
        <h1 className="text-[clamp(1.25rem,2vw,3rem)] font-bold">
          Join the Lumina Collective
        </h1>
        <p className="mt-5 text-xs max-w-[60ch] text-center">
          Subscribe to receive first access to new arrivals, private sales, and
          fashion inspiration.
        </p>
        <div className="max-w-180 w-full mt-10">
          <NewsLetterInput />
        </div>
        <p className="mt-10">
          By subscribing, you agree to our Privacy Policy ang Terms of Service
        </p>
      </div>
    </div>
  );
};

export default NewsLetterSection;
