import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { getFaqs } from "../../ApiServices/AllFaqs";
import "./faqsStyle.scss";
function Faqs() {
  const [openIndex, setOpenIndex] = useState(null);
  const [faqsData, setFaqsData] = useState([]);
  const [displayCount, setDisplayCount] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchFaqs = async () => {
      setIsLoading(true);
      try {
        const data = await getFaqs();
        setFaqsData(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch FAQs:", error);
        setIsLoading(false);
        setFaqsData([]);
      } finally {
      }
    };
    fetchFaqs();
  }, []);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const showMoreFaqs = () => {
    setDisplayCount((prev) => Math.min(prev + 5, faqsData.length));
  };
  const showLessFaqs = () => {
    setDisplayCount(5);
    setOpenIndex(null);
  };

  return (
    <section>
      <Helmet>
        <title>Frequently Asked Questions | VERTEX</title>
      </Helmet>
      <div className="faqHeader w-full h-[65vh] flex flex-col justify-center items-center text-center text-white">
        <h1 className="text-3xl font-bold mb-4">FAQs</h1>
        <p className="text-14 font-light w-96 leading-normal">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do Lorem
          ipsum dolor
        </p>
      </div>
      <section className="px-24 my-14">
        <div>
          {faqsData.slice(0, displayCount).map((item, index) => (
            <div
              key={index}
              className={`mt-5 p-5 bg-gray-50 rounded-lg transition-all duration-300 ${
                openIndex === index ? "border-2 border-primary" : ""
              }`}
            >
              <div
                onClick={() => toggleFaq(index)}
                className="flex justify-between items-center cursor-pointer"
              >
                <h1 className="font-bold text-17">{item.question}</h1>
                <span>
                  {openIndex === index ? (
                    <IoIosArrowUp color="#E0A75E" />
                  ) : (
                    <IoIosArrowDown color="#E0A75E" />
                  )}
                </span>
              </div>
              {openIndex === index && (
                <p className="mt-5 text-secondary text-14 font-light">
                  {item.answer}
                </p>
              )}
            </div>
          ))}
          {faqsData.length === 0 && !isLoading && (
            <div className="mt-5 p-5 bg-gray-50 rounded-lg text-center">
              <p className="text-gray-500 text-14">No FAQs found</p>
            </div>
          )}
        </div>
        <div className="flex justify-center mt-5 gap-3">
          {displayCount < faqsData.length && (
            <button
              onClick={showMoreFaqs}
              className="text-center text-15 bg-primary font-bold text-white cursor-pointer w-44 px-4 py-2 rounded-lg hover:bg-opacity-90 transition"
            >
              Show More (5)
            </button>
          )}
          {displayCount > 5 && (
            <button
              onClick={showLessFaqs}
              className="text-center text-15 bg-gray-50 font-bold text-gray-500 cursor-pointer w-44 px-4 py-2 rounded-lg hover:bg-opacity-90 transition"
            >
              Show Less
            </button>
          )}
        </div>
      </section>
    </section>
  );
}
export default Faqs;