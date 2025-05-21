import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./headerStyle.scss";
import { IoIosArrowRoundForward } from "react-icons/io";

import headerImage1 from "./header.png";
import headerImage2 from "./header.png";
import headerImage3 from "./header.png";

const Header = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState(null);

  const headerImages = [
    {
      id: 1,
      src: headerImage1,
      alt: "Winter Collection 1",
      title: "Winter Collection For Creative People",
    },
    {
      id: 2,
      src: headerImage2,
      alt: "Winter Collection 2",
      title: "Premium Quality Winter Wear",
    },
    {
      id: 3,
      src: headerImage3,
      alt: "Winter Collection 3",
      title: "Stylish Winter Outfits",
    },
  ];

  const handleExploreClick = () => {
    const nextSection = document.getElementById("next-section");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header className="header">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
          onSwiper={setSwiperInstance}
        >
          {headerImages.map((image) => (
            <SwiperSlide key={image.id}>
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
                        className="text-white w-48 justify-center bg-primary p-3 rounded-md flex items-center gap-2 mt-6 hover:bg-primary-dark transition-colors"
                      >
                        Explore Now < IoIosArrowRoundForward size={25}/>
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
              key={image.id}
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