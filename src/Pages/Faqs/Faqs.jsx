import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { getFaqs } from "../../ApiServices/AllFaqs";
import "./faqsStyle.scss";
function Faqs() {
  const [openIndex, setOpenIndex] = useState(null);
  const [faqsData, setFaqsData] = useState([]);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const data = await getFaqs();
        setFaqsData(data);
      } catch (error) {
        console.error("Failed to fetch FAQs:", error);
        setFaqsData([]);
      } finally {
      }
    };
    fetchFaqs();
  }, []);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section>
      <Helmet>
        <title>Frequently Asked Questions | VERTEX</title>
      </Helmet>
      <div className="faqHeader w-full h-[65vh] flex flex-col justify-center items-center text-center text-white">
        <h1 className="text-3xl font-bold mb-4">FAQs</h1>
        <p className="text-14 font-light w-96 leading-normal">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do Lorem ipsum dolor
        </p>
      </div>
      {/* FAQ Section */}
      <div className="flex justify-center px-5  my-10">
        <section className="w-900">
          {faqsData.slice(0, 5).map((item, index) => (
            <div
              key={index}
              className={`mt-5 p-5 bg-gray-50 rounded-lg transition-all duration-300 ${
                openIndex === index ? "border-2 border-primary" : "bg-gray-50"
              }`}
            >
              <div
                onClick={() => toggleFaq(index)}
                className="flex justify-between items-center cursor-pointer"
              >
                <h2 className="font-bold text-lg">{item.question}</h2>
                <span>
                  {openIndex === index ? (
                    <IoIosArrowUp color="#E0A75E" />
                  ) : (
                    <IoIosArrowDown color="#E0A75E" />
                  )}
                </span>
              </div>
              {openIndex === index && (
                <p className="mt-5 text-secondary text-sm font-light">
                  {item.answer}
                </p>
              )}
            </div>
          ))}
        </section>
      </div>
    </section>
  );
}
export default Faqs;