import { useState, useEffect } from "react";
import { getHomeData } from "../../ApiServices/Home";
import { ClipLoader } from "react-spinners";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { useTranslation } from "react-i18next";

function AboutExpiredPromo() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [expiringPromotions, setExpiringPromotions] = useState([]);
  const { t } = useTranslation();
  useEffect(() => {
    const fetchPromotions = async () => {
      setIsLoading(true);
      try {
        const response = await getHomeData();
        const promotions = response.promotions || [];
        const now = new Date();
        const soonExpiring = promotions.filter((promo) => {
          const endDate = new Date(promo.end_date);
          const timeDiff = endDate - now;
          const daysDiff = timeDiff / (1000 * 60 * 60 * 24);
          return daysDiff > 0 && daysDiff <= 7;
        });

        setExpiringPromotions(soonExpiring);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPromotions();
  }, []);

  const StarRating = ({ rating }) => {
    if (rating === null || rating === undefined || isNaN(rating)) {
      return (
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <FaStar key={`empty-${i}`} className="text-gray-300" />
          ))}
        </div>
      );
    }

    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-yellow-400" />);
    }

    // Half star
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
    }

    // Empty stars
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-yellow-400" />);
    }

    return (
      <div className="flex items-center gap-1">
        {stars}
        <span className="text-13 ml-1">({rating.toFixed(1)})</span>
      </div>
    );
  };

  const CountdownTimer = ({ endDate }) => {
    const [timeLeft, setTimeLeft] = useState({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });

    useEffect(() => {
      const timer = setInterval(() => {
        const now = new Date();
        const end = new Date(endDate);
        const difference = end - now;

        if (difference <= 0) {
          clearInterval(timer);
          return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }, 1000);

      return () => clearInterval(timer);
    }, [endDate]);

    return (
      <div className="absolute -top-7 left-96 bg-white border-2 border-red-600 w-550 h-16 rounded-full">
        <div className="flex items-center justify-around">
          <div className="">
            <p className="font-bold text-16">
              {t("dealDays")}
              <span className="font-light text-13 ms-16">{t("endIn")}</span>
            </p>
          </div>
          <div className="flex items-center gap-3 text-white py-2">
            <div className="text-center bg-red-600 rounded-full flex items-center justify-center gap-1 w-11 h-11">
              <div className="text-15">{timeLeft.days}</div>
              <div className="text-15">D</div>
            </div>
            <div className="text-center bg-red-600 rounded-full flex items-center justify-center gap-1 w-11 h-11">
              <div className="text-15">{timeLeft.hours}</div>
              <div className="text-15">H</div>
            </div>
            <div className="text-center bg-red-600 rounded-full flex items-center justify-center gap-1 w-11 h-11 px-2">
              <div className="text-15">{timeLeft.minutes}</div>
              <div className="text-15">M</div>
            </div>
            <div className="text-center bg-red-600 rounded-full flex items-center justify-center gap-1 w-11 h-11 px-2">
              <div className="text-15">{timeLeft.seconds}</div>
              <div className="text-15">S</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="px-4 md:px-20 pt-20 pb-5">
      {error ? (
        <div className="text-red-500 text-center mt-10">
          {t("error")}
        </div>
      ) : isLoading ? (
        <div className="text-center mt-10">
          <ClipLoader color="#E0A75E" />
        </div>
      ) : expiringPromotions.length === 0 ? (
        <div className="text-gray-400 text-center mt-10 rtl:text-[18px]">
         {t("endSoon")}
        </div>
      ) : (
        <div className="">
          {expiringPromotions.slice(0, 1).map((promotion) => {
            const firstItem = promotion.promotion_items[0];
            const product = firstItem?.product;
            if (!product) return null;

            return (
              <div
                key={promotion.id}
                className="flex h-80 py-3 relative rounded-lg border-2 border-red-600 w-full"
              >
                <div className="flex items-center justify-center mt-8 px-20 relative">
                  {product?.images?.[0]?.src ? (
                    <img
                      src={product.images[0].src}
                      alt={product.name}
                      className="h-full w-330 py-3 rounded-lg"
                    />
                  ) : (
                    <div className="text-gray-400 text-14">
                      {t("noImageAvailable")}
                    </div>
                  )}
                </div>

                <div className="pt-20 pr-10">
                  <p className="text-14 text-gray-500 mb-2">{t("catName")}</p>
                  <div>
                    <p className="font-bold text-lg my-2">{product.name}</p>
                    <div className="my-2">
                      <StarRating rating={product.rate} />
                    </div>
                    <div className="flex items-center gap-3 mt-3">
                      <span className="font-bold text-primary text-lg">
                        ${product.price_after_discount?.toFixed(2)}
                      </span>
                      <span className="line-through text-15 text-gray-400">
                        ${product.price?.toFixed(2)}
                      </span>
                      <span className="bg-red-600 rounded-2xl text-white text-sm px-2 py-1">
                        -{product.discount_percentage}%
                      </span>
                    </div>
                  </div>
                </div>
                <CountdownTimer endDate={promotion.end_date} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
export default AboutExpiredPromo;