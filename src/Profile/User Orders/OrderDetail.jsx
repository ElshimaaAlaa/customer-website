import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import PhoneNum from "../../Svgs/PhoneNum";
import EmailAddress from "../../Svgs/EmailAddress";
import Acc from "../../Svgs/Acc";
import { FaCircleDollarToSlot } from "react-icons/fa6";
import { TbCirclePlus } from "react-icons/tb";
import { IoIosArrowRoundBack } from "react-icons/io";
import { ClipLoader } from "react-spinners";

function OrderDetails() {
  const [orderDetail, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const API_BASE_URL = "https://";
  const live_shop_domain = localStorage.getItem("live_shop_domain");

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        const response = await axios({
          url: `${API_BASE_URL}${live_shop_domain}/api/orders/${id}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user token")}`,
            "Accept-Language": "en",
          },
        });
        if (response.status === 200) {
          setOrderDetails(response.data.data);
        }
      } catch (error) {
        console.error("API call failed: ", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrderDetails();
  }, [live_shop_domain, id]);

  const icons = [
    { icon: <PhoneNum /> },
    { icon: <EmailAddress /> },
    { icon: <Acc /> },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#E0A75E" size={50} />
      </div>
    );
  }

  if (!orderDetail) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Failed to load order details</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 text-primary flex items-center gap-1"
        >
          <IoIosArrowRoundBack size={20} /> Back to Orders
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white pb-10">
      <Helmet>
        <title>Order Details | VERTEX</title>
      </Helmet>
      
      <section className="userHeader w-full h-[65vh] flex flex-col justify-center items-center text-center text-white">
        <h1 className="text-3xl font-bold mb-4">My Account</h1>
        <p className="text-14 font-light">
          Manage your account, and view your orders...
        </p>
      </section>

      <section className="p-8 bg-customOrange-lightOrange flex items-center justify-between px-20">
        <div className="flex items-center gap-2">
          <FaCircleDollarToSlot color="#E0A75E" size={22} />
          <p className="text-gray-600 text-15">
            Current Balance:
            <span className="text-black text-[18px] font-bold ms-2">$ 2,322</span>
          </p>
        </div>
        <p className="font-bold text-primary flex items-center gap-1">
          <TbCirclePlus size={23} />
          Add To your balance
        </p>
      </section>

      <div className="px-20 py-10">
        <button
          className="text-primary text-14 underline flex items-center rounded-md -ms-4 mb-2 p-3 gap-2"
          onClick={() => navigate("/Home/UserProfile/UserOrder")}
        >
          <IoIosArrowRoundBack size={25} /> Back to Orders
        </button>
        
        <h3 className="font-bold text-16 mb-3">View Order</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 space-y-5">
            {/* Order Status Section */}
            <section className="border border-gray-200 rounded-md p-4 bg-white">
              <div className="flex justify-between">
                <h2 className="font-bold text-17">
                  Order ID: <span className="text-14">{orderDetail.order_number}</span>
                </h2>
                <p
                  className={`px-2 py-2 rounded-md text-13 ${
                    orderDetail.status === 1
                      ? "bg-customOrange-mediumOrange text-primary"
                      : orderDetail.status_name === "Refunded"
                      ? "bg-red-50 text-red-600"
                      : ""
                  }`}
                >
                  {orderDetail.status_name}
                </p>
              </div>
              {orderDetail.history?.map((statusItem, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between mt-5 first:mt-5"
                >
                  <p className="text-14 flex gap-2 items-center">
                    <FaCheckCircle
                      size={20}
                      color={statusItem.active ? "#E0A75E" : "#D1D5DB"}
                    />
                    {statusItem.status_name}
                  </p>
                  <span className="text-gray-400 text-10">
                    {statusItem.date || "Not available"}
                  </span>
                </div>
              ))}
            </section>

            {/* Order Details Section */}
            <section className="border border-gray-200 rounded-md p-4 bg-white">
              <h2 className="font-bold text-15">Order Details</h2>
              <div className="flex gap-36 mt-4">
                <div>
                  <h4 className="text-gray-400 text-15">Item No</h4>
                  <p className="text-14">
                    {orderDetail.products.reduce(
                      (total, product) => total + product.quantity,
                      0
                    )}
                  </p>
                </div>
                <div>
                  <h4 className="text-gray-400 text-15">Payment</h4>
                  <p
                    className={`px-2 py-2 rounded-md text-13 mt-1 ${
                      orderDetail.payment_status === "unpaid"
                        ? "bg-gray-100 text-gray-400"
                        : orderDetail.payment_status === "paid"
                        ? "text-[#28A513] bg-[#E7F6E5]"
                        : orderDetail.payment_status === "refund"
                        ? "text-red-600 bg-red-50"
                        : ""
                    }`}
                  >
                    {orderDetail.payment_status}
                  </p>
                </div>
              </div>
            </section>

            {/* Products List Section */}
            <section className="border border-gray-200 rounded-md p-4 bg-white">
              <h2 className="font-bold text-15 mb-4">List Items</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="px-3 py-2 text-left text-14 font-medium text-gray-500">Product</th>
                      <th className="px-3 py-2 text-left text-14 font-medium text-gray-500">Price</th>
                      <th className="px-3 py-2 text-left text-14 font-medium text-gray-500">Quantity</th>
                      <th className="px-5 py-2 text-left text-14 font-medium text-gray-500">Color</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderDetail.products?.map((item) => (
                      <tr key={item.id} className="border-b border-gray-200">
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-3">
                            {item.product.images?.[0]?.src && (
                              <img
                                src={item.product.images[0].src}
                                alt={item.product.name}
                                className="w-10 h-10 object-cover rounded-full"
                              />
                            )}
                            <span className="text-13">
                              {item.product.name || item.product.name_ar}
                            </span>
                          </div>
                        </td>
                        <td className="px-3 py-3 text-13">
                          ${item.price?.toFixed(2) || item.product.price?.toFixed(2)}
                        </td>
                        <td className="px-3 py-3 text-13">
                          <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full font-medium">
                            {item.quantity}
                          </span>
                        </td>
                        <td className="px-5 py-3 text-13">
                          {item.color && (
                            <div
                              className="w-6 h-6 rounded-full border border-gray-200"
                              style={{ backgroundColor: item.color }}
                              title={item.color}
                            />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <section className="bg-gray-50 rounded-lg px-3 py-5 mt-4 flex flex-col gap-7">
                <div className="flex items-center justify-between">
                  <p className="text-15">Subtotal</p>
                  <p className="text-gray-400 text-15">
                    $ {orderDetail.sub_total?.toFixed(2) || 0}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-15">Shipping</p>
                  <p className="text-gray-400 text-15">
                    $ {orderDetail.shipping?.toFixed(2) || 0}
                  </p>
                </div>
                <div className="flex items-center justify-between border-t-3">
                  <p className="text-15 mt-5">Total</p>
                  <p className="text-gray-400 text-15">
                    $ {orderDetail.total?.toFixed(2) || 0}
                  </p>
                </div>
              </section>
            </section>

            {/* Transactions Section */}
            <section className="border border-gray-200 rounded-md p-4 bg-white">
              <h2 className="font-bold text-15">Transactions</h2>
              <div className="mt-2">
                <p className="text-16 mt-6">Payment</p>
                <div className="space-y-2">
                  {orderDetail.transactions?.map((method, index) => (
                    <div
                      key={`transaction-${index}`}
                      className="flex justify-between"
                    >
                      <span className="text-gray-400 text-15">
                        {method.payment_method || "N/A"}
                      </span>
                      <span className="text-gray-600">
                        $ {method.amount?.toFixed(2) || 0}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-5">
            <div className="grid grid-cols-1 gap-5">
              {/* Shipping Address */}
              <section className="border border-gray-200 rounded-md p-4 bg-white">
                <h2 className="font-bold text-15">Shipping Address</h2>
                <p className="text-12 mt-2">
                  {orderDetail.shipping_address || "Not Available"}
                </p>
              </section>

              {/* Customer Details */}
              <section className="border border-gray-200 rounded-md p-4 bg-white">
                <h2 className="font-bold text-15 mb-4">Customer Details</h2>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-14 font-bold underline">
                    <span className="text-gray-500">{icons[2]?.icon}</span>
                    <span>{orderDetail.user?.name || "No name provided"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-14 font-bold underline">
                    <span className="text-gray-500">{icons[1]?.icon}</span>
                    <span>
                      {orderDetail.user?.email || "No email provided"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-14 font-bold underline">
                    <span className="text-gray-500">{icons[0]?.icon}</span>
                    <span>
                      {orderDetail.user?.phone || "No phone provided"}
                    </span>
                  </div>
                </div>
              </section>

              {/* Balance Section */}
              <section className="border border-gray-200 rounded-md p-4 bg-white">
                <h2 className="font-bold text-15 mb-3">Balance</h2>
                <div className="bg-gray-50 border border-gray-200 rounded-md p-2">
                  <div className="flex justify-between items-center">
                    <p className="text-15">Order Total</p>
                    <p className="text-gray-400 text-15">0</p>
                  </div>
                  <div className="flex justify-between items-center mt-5">
                    <p className="text-15">Return Total</p>
                    <p className="text-gray-400 text-15">0</p>
                  </div>
                  <hr className="border-gray-300 my-2" />
                  <div className="flex justify-between items-center mt-5">
                    <p className="text-15">Paid by customer</p>
                    <p className="text-gray-400 text-15">0</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-15 mt-5">Refunded</p>
                    <p className="text-gray-400 text-15">0</p>
                  </div>
                  <hr className="border-gray-300 my-2" />
                  <div className="mt-5 flex justify-between">
                    <div>
                      <p>Balance</p>
                      <span className="text-gray-500 text-13">
                        (customer owes you)
                      </span>
                    </div>
                    <p className="text-gray-400 text-15">0</p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;