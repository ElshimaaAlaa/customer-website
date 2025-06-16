import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { Profile } from "../../ApiServices/Profile";
import { IoCopyOutline } from "react-icons/io5";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

function PersonalInformation() {
  const navigate = useNavigate();
  const [personalInfo, setPersonalInfo] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const getInfo = async () => {
      try {
        const data = await Profile();
        setPersonalInfo(data);
      } catch (error) {
        console.error("Failed to fetch personal info:", error);
        setError(
          "Failed to load personal information. Please try again later."
        );
      }
    };
    getInfo();
  }, []);

  const copyPhoneNumber = () => {
    if (personalInfo.phone) {
      navigator.clipboard
        .writeText(personalInfo.phone)
        .then(() => {
          toast.success("Phone number copied to clipboard!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        })
        .catch((err) => {
          console.error("Failed to copy phone number: ", err);
          toast.error("Failed to copy phone number", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    } else {
      toast.warn("No phone number available to copy", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div>
      <Helmet>
        <title>Personal Information</title>
        <meta name="description" content="Edit personal information" />
        <meta property="og:title" content="Edit Personal Information" />
        <meta property="og:description" content="Edit personal information" />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://vertex-dashboard.com/personal-information"
        />
      </Helmet>
      <section>
        <div className="flex flex-col md:flex-row items-center justify-between mb-2">
          <h1 className="font-bold text-[19px]">Personal Information</h1>
          <button
            onClick={() => navigate("EditInfo", { state: personalInfo })}
            className="text-white font-semibold flex items-center justify-center gap-3 bg-primary p-2 w-24 rounded-md"
            aria-label="Edit personal information"
          >
            <img src="/assets/svgs/edit.svg" alt="Edit icon" className="w-7" />
            Edit
          </button>
        </div>
        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-md mb-6">
            {error}
          </div>
        )}
        <div className="bg-gray-50 flex flex-col md:flex-row items-center gap-5 my-3 border rounded-md p-3 w-full">
          <img
            src={personalInfo.image || "/assets/images/default-profile.png"}
            alt="User profile"
            className="rounded-xl w-32 h-24 md:w:20 md:h-20 object-cover"
            onError={(e) => {
              e.target.src = "/assets/images/default-profile.png";
            }}
          />
          <div className="text-center md:text-left">
            <h2 className="font-semibold text-16 mt-3">
              {personalInfo?.name || "N/A"}
            </h2>
            <p className="text-gray-400 text-13">
              {personalInfo?.role || "Vertex CEO"}
            </p>
          </div>
        </div>
        {/* Name, Phone, and Email Section */}
        <div className="bg-gray-50 border rounded-md p-3 w-full">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-96">
            <div>
              <p className="text-gray-400 text-15">Name</p>
              <p className="text-14">{personalInfo?.name || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-400 text-15">Email</p>
              <p className="text-14">{personalInfo?.email || "N/A"}</p>
            </div>
          </div>
          <div className="mt-3">
            <p className="text-gray-400 text-15">Phone</p>
            <div className="flex items-center gap-3">
              <p className="font-medium text-13">
                {personalInfo.phone || "not provided"}
              </p>
              <button
                onClick={copyPhoneNumber}
                className="text-blue-500 hover:text-blue-700 text-sm flex items-center gap-1"
                title="Copy phone number"
              >
                <IoCopyOutline color="#E0A75E" size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default PersonalInformation;