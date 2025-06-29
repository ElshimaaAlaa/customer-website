import Delivary from "../../Svgs/delivary";
import Pay from "../../Svgs/pay";
import Qualityicon from "../../Svgs/quality";

function Quality() {
  return (
    <section className="flex flex-col gap-6 px-5 lg:flex-row md:flex-row lg:px-20 py-6">
      <div className="flex gap-3 bg-customOrange-lightOrange rounded-xl py-7 px-8 w-full ">
        <Delivary />
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-17 mt-1">Quick Delivery</h2>
          <p className="text-darkGray text-14 leading-5">
            Delivery in more suitable <br/>short time
          </p>
        </div>
      </div>
      <div className="flex gap-3 bg-customOrange-lightOrange rounded-xl py-7 px-8 w-full">
        <Pay />
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-17 mt-1">Flexible Payment</h2>
          <p className="text-darkGray text-14 leading-5">
            Multiple secure payment <br/>options
          </p>
        </div>
      </div>
      <div className="flex gap-3 bg-customOrange-lightOrange rounded-xl py-7 px-8 w-full">
        <Qualityicon />
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-17 mt-1">24 X 7 Support</h2>
          <p className="text-darkGray text-14">We Support online all days </p>
        </div>
      </div>
    </section>
  );
}
export default Quality;