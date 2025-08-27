import { Helmet } from "react-helmet";
import "./aboutusStyle.scss";
import AboutInspire from "../../Svgs/about1";
import About2 from "../../Svgs/about2";
import About3 from "../../Svgs/about3";
import { useTranslation } from "react-i18next";
import { useEffect, useRef } from "react"; // أضف useRef

function AboutUs() {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  // دالة لإضافة انيميشن عند التمرير
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      
      // انيميشن للعناصر الفردية
      const elements = document.querySelectorAll('.fade-in-element');
      elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        if (scrollPosition > elementPosition + 100) {
          element.classList.add('visible');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    // تشغيل مرة أولى عند التحميل
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="bg-white pb-10" ref={sectionRef}>
      <Helmet>
        <title>{t("aboutUs")} | {t("vertex")}</title>
      </Helmet>
      <div className="aboutHeader w-full h-[65vh] flex flex-col justify-center items-center text-center text-white">
        <h1 className="text-5xl font-bold mb-4 fade-in-element">{t("aboutUs")}</h1>
        <p className="text-15 font-light leading-normal w-310 md:w-600px lg:w-600px fade-in-element">
          {t("aboutUsHeader")}
        </p>
      </div>
      <div className="py-10 px-5 md:px-10 lg:px-20 flex flex-col items-center">
        <p className="text-gray-400 text-15 leading-8 w-full fade-in-element">
          <span className="font-bold">{t("vertex")}</span> {t("aboutUsContent")}
        </p>
        <div className="flex flex-col gap-4 md:px-20 md:gap-3 lg:gap-6 md:flex-row mt-10 w-full justify-center">
          <div 
            className="flex flex-col items-center bg-gray-50 gap-3 border-1 border-gray-200 rounded-xl py-5 md:px-4 px-10 lg:px-10 fade-in-element"
            ref={el => cardsRef.current[0] = el}
          >
            <AboutInspire className="mt-5" />
            <h3 className="font-bold text-17">{t("globalInspirationtitle")}</h3>
            <p className="text-gray-400 text-14 text-center w-52">
              {t("globalInspirationdescription")}
            </p>
          </div>
          <div 
            className="flex flex-col items-center bg-gray-50 gap-4 border-1 border-gray-200 rounded-xl py-5 md:px-4 px-10 lg:px-10 fade-in-element"
            ref={el => cardsRef.current[1] = el}
          >
            <About2 className="mt-5" />
            <h3 className="font-bold text-17">{t("empoweringStyletitle")}</h3>
            <p className="text-gray-400 text-14 text-center w-52">
             {t("empoweringStyledescription")}
            </p>
          </div>
          <div 
            className="flex flex-col items-center bg-gray-50 gap-4 border-1 border-gray-200 rounded-xl py-5 md:px-4 px-10 lg:px-10 fade-in-element"
            ref={el => cardsRef.current[2] = el}
          >
            <About3 className="mt-5" />
            <h3 className="font-bold text-17 text-center">
            {t("passionateCraftsmanshiptitle")}
            </h3>
            <p className="text-gray-400 text-14 text-center w-52">
             {t("passionateCraftsmanshipdescription")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
export default AboutUs;