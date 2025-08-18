import { useState, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./headerStyle.scss";
import headerImage1 from "./header.png";
import headerImage2 from "./header2.png";
import headerImage3 from "./header3.png";
import { useTranslation } from "react-i18next";
import { IoIosArrowRoundForward, IoIosArrowRoundBack } from "react-icons/io";

const Header = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";

  const headerImages = useMemo(() => [
    {
      id: 1,
      src: headerImage1,
      alt: "Winter Collection 1",
      title: t("headerP1"),
    },
    {
      id: 2,
      src: headerImage2,
      alt: "Winter Collection 2",
      title: t("headerP2"),
    },
    {
      id: 3,
      src: headerImage3,
      alt: "Winter Collection 3",
      title: t("headerP3"),
    },
  ], [t]);

  const handleExploreClick = () => {
    const nextSection = document.getElementById("next-section");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header className="header" key={`header-${i18n.language}`}>
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
          onSwiper={setSwiperInstance}
          dir={isRtl ? "rtl" : "ltr"} 
          key={`swiper-${i18n.language}`} 
        >
          {headerImages.map((image) => (
            <SwiperSlide >
              <div
                className="slide-image"
                style={{ backgroundImage: `url(${image.src})` }}
              >
                <div className="overlay">
                  <div className="content">
                    <h1 className="text-white font-bold text-3xl leading-10 text-center">
                      {image.title}
                    </h1>
                    <div className="flex justify-center">
                      <button
                        onClick={handleExploreClick}
                        className="text-white  justify-center bg-primary p-4 text-lg font-bold rounded-md flex items-center gap-2 mt-6 hover:bg-primary-dark transition-colors"
                      >
                        {t("exploreNow")}
                        {isRtl ? (
                          <IoIosArrowRoundBack size={25} />
                        ) : (
                          <IoIosArrowRoundForward size={25} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation tabs */}
        <div className="tabs-container">
          {headerImages.map((image, index) => (
            <button
              key={`tab-${image.id}-${i18n.language}`}
              className={`tab ${activeSlide === index ? "active" : ""}`}
              onClick={() => swiperInstance?.slideTo(index)}
            />
          ))}
        </div>
      </header>
      {/* Next section that the button will scroll to */}
      <section id="next-section"></section>
    </>
  );
};

export default Header;