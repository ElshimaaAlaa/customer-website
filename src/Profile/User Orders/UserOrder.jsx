import { useEffect, useState, useRef, useMemo } from "react";
import { Orders } from "../../ApiServices/Orders";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import ReactPaginate from "react-paginate";
import { useTranslation } from "react-i18next";
import { BsSortDown } from "react-icons/bs";
import CustomCalendar from "../../Components/Custome Calender/CustomeCalender";


function UserOrder() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [orders, setOrders] = useState([]);
  const [product, setProduct] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  // حالات الفلاتر
  const [paymentFilter, setPaymentFilter] = useState(null);
  const [statusFilter, setStatusFilter] = useState(null);
  const [dateFilter, setDateFilter] = useState(null);
  const [showPaymentDropdown, setShowPaymentDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const paymentDropdownRef = useRef(null);
  const statusDropdownRef = useRef(null);
  const datePickerRef = useRef(null);

  const [pagination, setPagination] = useState({
    total: 0,
    count: 0,
    per_page: 5,
    current_page: 1,
    total_pages: 1,
    next_page_url: null,
    prev_page_url: null,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        paymentDropdownRef.current &&
        !paymentDropdownRef.current.contains(event.target)
      ) {
        setShowPaymentDropdown(false);
      }
      if (
        statusDropdownRef.current &&
        !statusDropdownRef.current.contains(event.target)
      ) {
        setShowStatusDropdown(false);
      }
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target)
      ) {
        setShowDatePicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchReceivedOrder = async () => {
      setIsLoading(true);
      setError(false);
      try {
        const response = await Orders(pagination.current_page);
        const ordersData = response.data || response;
        const ordersArray = Array.isArray(ordersData) ? ordersData : [];
        setProduct(response.products);
        setOrders(ordersArray);
        setPagination(
          response.pagination || {
            total: ordersArray.length,
            count: ordersArray.length,
            per_page: 5,
            current_page: 1,
            total_pages: Math.ceil(ordersArray.length / 5),
            next_page_url: null,
            prev_page_url: null,
          }
        );
      } catch (error) {
        console.error("API call failed: ", error);
        setError(true);
        setOrders([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchReceivedOrder();
  }, [pagination.current_page, i18n.language]);

  // Get unique payment and status values for dropdowns
  const uniquePaymentStatuses = useMemo(() => {
    const payments = new Set(orders.map((order) => order.payment_status));
    return Array.from(payments);
  }, [orders]);

  const uniqueOrderStatuses = useMemo(() => {
    const statuses = new Set(orders.map((order) => order.status_name));
    return Array.from(statuses);
  }, [orders]);

  // تطبيق جميع الفلاتر على البيانات
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      // فلترة البحث
      if (debouncedSearchQuery) {
        const searchTerm = debouncedSearchQuery.toLowerCase();
        const fieldsToSearch = [
          order.order_number?.toString().toLowerCase() || "",
          order.status_name?.toString().toLowerCase() || "",
          order.payment_status?.toString().toLowerCase() || "",
          order.total?.toString().toLowerCase() || "",
          order.date?.toString().toLowerCase() || "",
          order.items_count?.toString().toLowerCase() || "",
        ];
        if (!fieldsToSearch.some((field) => field.includes(searchTerm))) {
          return false;
        }
      }

      // فلترة حالة الدفع
      if (paymentFilter && order.payment_status !== paymentFilter) {
        return false;
      }

      // فلترة حالة الطلب
      if (statusFilter && order.status_name !== statusFilter) {
        return false;
      }

      // فلترة التاريخ
      if (dateFilter && order.date) {
        const orderDate = new Date(order.date).toDateString();
        const filterDate = new Date(dateFilter).toDateString();
        if (orderDate !== filterDate) {
          return false;
        }
      }

      return true;
    });
  }, [orders, debouncedSearchQuery, paymentFilter, statusFilter, dateFilter]);

  // Check if only date filter is active
  const isOnlyDateFilterActive = useMemo(() => {
    return (
      dateFilter && !paymentFilter && !statusFilter && !debouncedSearchQuery
    );
  }, [dateFilter, paymentFilter, statusFilter, debouncedSearchQuery]);

  // Clear filter functions
  const clearPaymentFilter = () => {
    setPaymentFilter(null);
  };

  const clearStatusFilter = () => {
    setStatusFilter(null);
  };

  const clearDateFilter = () => {
    setDateFilter(null);
  };

  const handlePageClick = ({ selected }) => {
    setPagination((prev) => ({
      ...prev,
      current_page: selected + 1,
    }));
  };

  const hasActiveFilters =
    paymentFilter || statusFilter || dateFilter || debouncedSearchQuery;

  return (
    <div>
      <h1 className="font-bold text-xl mb-4">{t("myOrders")}</h1>

      <div className="relative w-full">
        <Search
          className="absolute left-3 rtl:right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5"
          color="#E0A75E"
        />
        <input
          type="text"
          placeholder={t("search")}
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsSearching(true);
          }}
          className="w-full h-12 pl-10 pr-10 py-4 bg-muted/50 rounded-md text-sm focus:outline-none border-1 border-gray-200 bg-gray-50 placeholder:text-15 focus:border-2 focus:border-primary"
        />
      </div>

      {error ? (
        <div className="text-red-500 text-15 text-center mt-10">
          {t("error")}
        </div>
      ) : isLoading ? (
        <div className="text-gray-400 text-center mt-10">
          <ClipLoader color="#E0A75E" />
        </div>
      ) : filteredOrders.length === 0 && !isOnlyDateFilterActive ? (
        <div className="text-gray-400 text-15 text-center mt-10">
          {hasActiveFilters ? t("noMatchResults") : t("noResults")}
        </div>
      ) : (
        <>
          <div className="border border-gray-200 rounded-lg mt-4 ">
            <table className="bg-white min-w-full table relative">
              <thead>
                <tr>
                  <th className="px-3 py-3 border-b text-left cursor-pointer text-11 md:text-14 lg:text-14 rtl:text-right">
                    {t("orderId")}
                  </th>
                  <th className="px-3 py-3 text-left border text-11 md:text-14 lg:text-14 w-300 rtl:text-right">
                    <div className="flex items-center justify-between">
                      <p>{t("date")}</p>
                      <div className="flex items-center gap-2">
                        {dateFilter && (
                          <button
                            onClick={clearDateFilter}
                            className="text-primary text-13 flex items-center"
                            aria-label="Clear date filter"
                          >
                            {t("clear")}
                          </button>
                        )}
                        <div ref={datePickerRef} className="relative">
                          <button
                            className={`rounded-md p-2 ${
                              dateFilter
                                ? "bg-customOrange-lightOrange text-primary"
                                : "bg-customOrange-lightOrange text-primary"
                            }`}
                            onClick={() => setShowDatePicker(!showDatePicker)}
                            aria-label="Filter by date"
                          >
                            <BsSortDown />
                          </button>
                          {showDatePicker && (
                            <div className="absolute rtl:right-0 mt-0.5 z-10">
                              <CustomCalendar
                                selectedDate={dateFilter}
                                onChange={(date) => {
                                  setDateFilter(date);
                                  setShowDatePicker(false);
                                }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </th>
                  <th className="px-3 py-3 text-left border-r border-l text-11 md:text-14 lg:text-14 rtl:text-right">
                    {t("price")}
                  </th>
                  <th className="px-3 py-3 text-left border-l text-11 md:text-14 lg:text-14 rtl:text-right">
                    {t("items")}
                  </th>
                  <th className="px-3 py-3 text-left border text-11 md:text-14 lg:text-14 rtl:text-right">
                    <div className="flex items-center justify-between">
                      <p>{t("payment")}</p>
                      <div className="flex items-center gap-2">
                        {paymentFilter && (
                          <button
                            onClick={clearPaymentFilter}
                            className="text-primary text-13 flex items-center"
                            aria-label="Clear payment filter"
                          >
                            {t("clear")}
                          </button>
                        )}
                        <div ref={paymentDropdownRef}>
                          <button
                            className={`rounded-md p-2 ${
                              paymentFilter
                                ? "bg-customOrange-lightOrange text-primary rounded-md"
                                : "bg-customOrange-lightOrange text-primary"
                            }`}
                            onClick={() =>
                              setShowPaymentDropdown(!showPaymentDropdown)
                            }
                            aria-label="Filter by payment status"
                          >
                            <BsSortDown />
                          </button>
                          {showPaymentDropdown && (
                            <div className="absolute rtl:left-44 mt-0.5 w-40 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                              {uniquePaymentStatuses.map((status) => (
                                <div
                                  key={status}
                                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-14 font-light"
                                  onClick={() => {
                                    setPaymentFilter(status);
                                    setShowPaymentDropdown(false);
                                  }}
                                >
                                  {status.payment_status === "unpaid" ||
                                  "غير مدفوع"
                                    ? t("unpaid")
                                    : status.payment_status === "paid" ||
                                      "مدفوع"
                                    ? t("paid")
                                    : ""}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </th>
                  <th className="px-3 py-3 text-left border-l text-11 md:text-14 lg:text-14 rtl:text-right">
                    <div className="flex items-center justify-between">
                      <p>{t("status")}</p>
                      <div className="flex items-center gap-2">
                        {statusFilter && (
                          <button
                            onClick={clearStatusFilter}
                            className="text-primary text-13 flex items-center"
                            aria-label="Clear status filter"
                          >
                            {t("clear")}
                          </button>
                        )}
                        <div ref={statusDropdownRef} className="">
                          <button
                            className={`rounded-md p-2 ${
                              statusFilter
                                ? "bg-customOrange-lightOrange text-primary rounded-md"
                                : "bg-customOrange-lightOrange text-primary"
                            }`}
                            onClick={() =>
                              setShowStatusDropdown(!showStatusDropdown)
                            }
                            aria-label="Filter by order status"
                          >
                            <BsSortDown />
                          </button>
                          {showStatusDropdown && (
                            <div className="absolute rtl:left-0 mt-0.5 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                              {uniqueOrderStatuses.map((status) => (
                                <div
                                  key={status}
                                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-14 font-light"
                                  onClick={() => {
                                    setStatusFilter(status);
                                    setShowStatusDropdown(false);
                                  }}
                                >
                                  {status === "Preparing"
                                    ? t("Preparing")
                                    : status === "Refunded"
                                    ? t("refund")
                                    : status === "Pending"
                                    ? t("pending")
                                    : status}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => navigate(`/Home/UserOrder/${order.id}`)}
                  >
                    <td className="px-3 py-3 border-t border-r border-b text-gray-600 text-13">
                      {order.order_number}
                    </td>
                    <td className="flex items-center gap-2 px-6 py-3 border-t border-r text-gray-600 text-11 md:text-13 lg:text-13 ">
                      <IoCalendarNumberOutline color="#69ABB5" size={16} />
                      {order.date || t("notProvided")}
                    </td>
                    <td className="px-3 py-3 border-t border-r text-gray-600 text-14">
                      {order.total} $
                    </td>
                    <td className="px-3 py-3 border-t border-r text-gray-600 text-14">
                      {order.products.reduce(
                        (total, product) => total + product.quantity,
                        0
                      )}
                    </td>
                    <td className="px-3 py-3 border text-14 ">
                      <span
                        className={`px-2 py-1 rounded-md  text-center ${
                          order.payment_status === "unpaid" || "غير مدفوع"
                            ? "bg-gray-100 text-gray-400"
                            : order.payment_status === "paid" || "مدفوع"
                            ? "text-[#28A513] bg-[#E7F6E5]"
                            : order.payment_status === "refund"
                            ? "text-red-600 bg-red-50"
                            : ""
                        }`}
                      >
                        {order.payment_status === "unpaid" || "غير مدفوع"
                          ? t("unpaid")
                          : order.payment_status === "paid" || "مدفوع"
                          ? t("paid")
                          : ""}
                      </span>
                    </td>
                    <td className="px-3 py-3 border-t">
                      <span
                        className={`px-2 py-1 rounded-md text-14 text-center  ${
                          order.status === 8
                            ? "bg-red-50 text-red-600"
                            : order.status === 2
                            ? "bg-customOrange-mediumOrange text-primary"
                            : order.status === 1
                            ? "bg-customOrange-mediumOrange text-primary"
                            : ""
                        }`}
                      >
                        {order.status_name === "Preparing"
                          ? t("Preparing")
                          : order.status_name === "Refunded"
                          ? t("refund")
                          : order.status_name === "Pending"
                          ? t("pending")
                          : ""}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ReactPaginate
            pageCount={pagination.total_pages}
            onPageChange={handlePageClick}
            forcePage={pagination.current_page - 1}
            containerClassName="flex items-center justify-end mt-5 "
            pageClassName="px-3 py-1 rounded-md"
            activeClassName="bg-customOrange-lightOrange text-primary"
            previousLabel={
              isRTL ? (
                <ChevronRight className="w-5 h-5 text-primary" />
              ) : (
                <ChevronLeft className="w-5 h-5 text-primary" />
              )
            }
            nextLabel={
              isRTL ? (
                <ChevronLeft className="w-5 h-5 text-primary" />
              ) : (
                <ChevronRight className="w-5 h-5 text-primary" />
              )
            }
            previousClassName={`px-3 py-1 rounded ${
              !pagination.prev_page_url
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-200"
            }`}
            nextClassName={`px-3 py-1 rounded ${
              !pagination.next_page_url
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-200"
            }`}
            disabledClassName="opacity-50 cursor-not-allowed"
          />
        </>
      )}
    </div>
  );
}
export default UserOrder;