import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { getFaqs } from "../../ApiServices/AllFaqs";
import "./faqsStyle.scss";
import { useTranslation } from "react-i18next";
function Faqs() {
  const [openIndex, setOpenIndex] = useState(null);
  const [faqsData, setFaqsData] = useState([]);
  const [displayCount, setDisplayCount] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
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
        <h1 className="text-5xl font-bold mb-4">{t("faqs")}</h1>
        <p className="text-17 font-light leading-normal w-500px">
          {t("faqsP")}
        </p>
      </div>
      <section className="px-5 md:px-10 lg:px-24 my-14">
        <div>
          {faqsData.slice(0, displayCount).map((item, index) => (
            <div
              key={index}
              className={`mt-3 p-7  bg-gray-50 rounded-lg transition-all duration-300 ${
                openIndex === index ? "border-2 border-primary" : ""
              }`}
            >
              <div
                onClick={() => toggleFaq(index)}
                className="flex justify-between items-center cursor-pointer"
              >
                <h1 className="font-bold text-lg">{item.question}</h1>
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
              <p className="text-gray-500 text-15">{t("noFaqs")}</p>
            </div>
          )}
        </div>
        <div className="flex justify-center mt-5 gap-3">
          {displayCount < faqsData.length && (
            <button
              onClick={showMoreFaqs}
              className="text-center text-17 bg-primary font-bold text-white cursor-pointer w-44 p-3 rounded-lg hover:bg-opacity-90 transition rtl:text-[15px]"
            >
              {t("showMore")}
            </button>
          )}
          {displayCount > 5 && (
            <button
              onClick={showLessFaqs}
              className="text-center text-17 bg-gray-50 font-bold text-gray-500 cursor-pointer w-44 p-3 rounded-lg hover:bg-opacity-90 transition rtl:text-[15px]"
            >
              {t("showLess")}
            </button>
          )}
        </div>
      </section>
    </section>
  );
}
export default Faqs;
