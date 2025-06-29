import { useEffect, useState } from "react";
import { Orders } from "../../ApiServices/Orders";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ReactPaginate from "react-paginate";
import { Search } from "lucide-react";

function UserOrder() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [orders, setOrders] = useState([]);
  const [product, setProduct] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();
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
  }, [pagination.current_page]);

  const filteredOrders = orders.filter((order) => {
    if (!debouncedSearchQuery) return true;
    const searchTerm = debouncedSearchQuery.toLowerCase();
    const fieldsToSearch = [
      order.order_number?.toString().toLowerCase() || "",
      order.status_name?.toString().toLowerCase() || "",
      order.payment_status?.toString().toLowerCase() || "",
      order.total?.toString().toLowerCase() || "",
      order.date?.toString().toLowerCase() || "",
      order.items_count?.toString().toLowerCase() || "",
    ];
    return fieldsToSearch.some((field) => field.includes(searchTerm));
  });

  const handlePageClick = ({ selected }) => {
    setPagination((prev) => ({
      ...prev,
      current_page: selected + 1,
    }));
  };

  return (
    <div>
      <h1 className="font-bold text-xl mb-2">My Orders</h1>
      {isSearching && debouncedSearchQuery !== searchQuery && (
        <div className="text-center py-2">
          <ClipLoader size={20} color="#E0A75E" />
        </div>
      )}
      <div className="relative w-full mt-3">
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5"
          color="#E0A75E"
        />
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsSearching(true);
          }}
          className="w-full h-12 pl-10 pr-10 py-4 bg-muted/50 rounded-md text-sm focus:outline-none border-1 border-gray-200 bg-gray-50 placeholder:text-15 focus:border-2 focus:border-primary"
        />
        {searchQuery && (
          <button
            onClick={() => {
              setSearchQuery("");
              setIsSearching(false);
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        )}
      </div>
      {error ? (
        <div className="text-red-500 text-15 text-center mt-10">
          Failed to fetch data. Please try again.
        </div>
      ) : isLoading ? (
        <div className="text-gray-400 text-center mt-10">
          <ClipLoader color="#E0A75E" />
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="text-gray-400 text-15 text-center mt-10">
          {debouncedSearchQuery
            ? "No orders match your search."
            : "No orders found."}
        </div>
      ) : (
        <>
          <div className="border border-gray-200 rounded-lg mt-2 overflow-hidden">
            <table className="bg-white min-w-full table">
              <thead>
                <tr>
                  <th className="px-3 py-3 border-b text-left cursor-pointer text-14">
                    <p className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4"
                        aria-label="Select all categories"
                      />
                      Order ID
                    </p>
                  </th>
                  <th className="px-3 py-3 text-left border-l text-14 w-300">Date</th>
                  <th className="px-3 py-3 text-left border-r border-l text-14">Price</th>
                  <th className="px-3 py-3 text-left border-l text-14">Items</th>
                  <th className="px-3 py-3 text-left border-l text-14">Payment</th>
                  <th className="px-3 py-3 text-left border-l text-14">Status</th>
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
                      <p className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4"
                          aria-label="Select all categories"
                        />
                        {order.order_number}
                      </p>
                    </td>
                    <td className="flex items-center gap-2 px-6 py-3 border-t border-r text-gray-600 text-13 ">
                      <IoCalendarNumberOutline color="#69ABB5" size={16} />
                      {order.date || "N/A"}
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
                    <td className="px-3 py-3 border-t border-r">
                      <span
                        className={`px-2 py-2 rounded-md text-14 text-center ${
                          order.payment_status === "unpaid" || "غير مدفوع"
                            ? "bg-gray-100 text-gray-400"
                            : order.payment_status === "paid" || "مدفوع"
                            ? "text-[#28A513] bg-[#E7F6E5]"
                            : order.payment_status === "refund"
                            ? "text-red-600 bg-red-50"
                            : ""
                        }`}
                      >
                        {order.payment_status}
                      </span>
                    </td>
                    <td className="px-3 py-3 border-t">
                      <span
                        className={`px-2 py-2 rounded-md text-14 text-center  ${
                          order.status === 8
                            ? "bg-red-50 text-red-600"
                            : order.status === 2
                            ? "bg-customOrange-mediumOrange text-primary"
                            : order.status === 1
                            ? "bg-customOrange-mediumOrange text-primary"
                            : ""
                        }`}
                      >
                        {order.status_name}
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
            previousLabel={<ChevronLeft className="w-5 h-5 text-primary" />}
            nextLabel={<ChevronRight className="w-5 h-5 text-primary" />}
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