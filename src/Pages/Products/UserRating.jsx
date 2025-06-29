import { useEffect, useRef, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { IoIosArrowRoundForward } from "react-icons/io";
import { IoIosArrowRoundBack } from "react-icons/io";
import { getHomeData } from "../../ApiServices/Home";

function UserRating() {
  const carouselRef = useRef();
  const [clientData, setClientData] = useState([]);

  useEffect(() => {
    const fetchClientsOpinions = async () => {
      try {
        const data = await getHomeData();
        setClientData(data.client_opinions);
      } catch (error) {
        console.error(error);
      }
    };
    fetchClientsOpinions();
  }, []);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 1,
      partialVisibilityGutter: 40,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 2,
      slidesToSlide: 1,
      partialVisibilityGutter: 40,
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 1,
      slidesToSlide: 1,
      partialVisibilityGutter: 40,
    },
  };

  const handlePrev = () => {
    carouselRef.current.previous();
  };

  const handleNext = () => {
    carouselRef.current.next();
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={
            i <= rating ? "text-yellow-400 text-lg" : "text-gray-300 text-lg"
          }
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <section className="px-4 md:px-8 lg:px-20 mt-6 mb-10">
      <h2 className="font-bold text-2xl mb-6">Rating & Reviews</h2>
      <div className="carousel-container mt-3 relative">
        <Carousel
          responsive={responsive}
          infinite={true}
          autoPlay={false}
          ref={carouselRef}
          arrows={false}
          showDots={false}
          containerClass="carousel"
          itemClass="pe-2"
          partialVisible={false}
        >
          {clientData.map((opinion, index) => (
            <div
              key={index}
              className="flex flex-col items-start border border-gray-100 justify-center lg:flex-row gap-4 bg-gray-100 rounded-lg p-3   w-full h-full me-3"
            >
              <div className="flex-1 py-2">
                <svg
                  viewBox="0 0 52 52"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 md:w-8"
                >
                  <circle
                    cx="25.9696"
                    cy="25.7855"
                    r="25.3788"
                    fill="#69ABB5"
                  />
                  <path
                    d="M36.955 35.2551H28.5164C27.6919 32.534 27.2797 29.714 27.2797 26.795C27.2797 23.8265 28.0314 21.4765 29.5348 19.7449C31.0868 17.9638 33.3662 17.0733 36.3731 17.0733V21.2291C33.9482 21.2291 32.7357 22.7381 32.7357 25.756V27.1661H36.955V35.2551ZM24.6607 35.2551H16.2221C15.3976 32.534 14.9854 29.714 14.9854 26.795C14.9854 23.8265 15.7371 21.4765 17.2405 19.7449C18.7925 17.9638 21.0719 17.0733 24.0788 17.0733V21.2291C21.6539 21.2291 20.4414 22.7381 20.4414 25.756V27.1661H24.6607V35.2551Z"
                    fill="white"
                  />
                </svg>
                <h3 className="text-sm pt-2 md:text-[14.5px] font-medium w-full lg:w-44 leading-6">
                  {opinion.comment}
                </h3>
                <div className="flex justify-between items-center gap-1">
                  <p className=""> {renderStars(opinion.rate)}</p>
                  <p className="text-gray-500 text-11">{opinion.date}</p>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <p className="text-13 text-gray-600 mt-2">
                    By {opinion.user_name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
      {/* Navigation Arrows */}
      <div className="flex justify-center mt-8 gap-5">
        <button
          className="bg-primary text-white p-2 w-10 h-10 font-bold rounded-full text-lg md:text-2xl hover:bg-primary-dark transition-colors"
          onClick={handlePrev}
          aria-label="Previous testimonial"
        >
          <IoIosArrowRoundBack size={25} />
        </button>
        <button
          className="bg-primary text-white p-2 w-10 h-10 font-bold rounded-full text-lg md:text-2xl hover:bg-primary-dark transition-colors"
          onClick={handleNext}
          aria-label="Next testimonial"
        >
          <IoIosArrowRoundForward size={25} />
        </button>
      </div>
    </section>
  );
}
export default UserRating;