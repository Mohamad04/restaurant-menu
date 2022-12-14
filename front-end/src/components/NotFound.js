import { Link } from "react-router-dom";
import Avatar from "./General/Avatar";


const notFound = () => {
  return (
    <div className="container px-5 py-12 mx-auto flex flex-wrap">
      <div className="lg:w-2/3 mx-auto">
        <div className="flex flex-wrap w-full px-10 relative mb-4">
          <Avatar
            url="https://kinsta.com/wp-content/uploads/2018/08/error-404-not-found.png"
            alt="not Found"
            size="full"
          />

          <div className="mt-6 text-center relative z-10 w-full">
            <h2 className="text-2xl text-gray-900 font-medium title-font mb-2">
              Sorry
            </h2>
            <p className="leading-relaxed">We couldn't find that page</p>
            <Link to="/admin/login">
              <span className="mt-3 text-indigo-500 inline-flex items-center">
                you can go to home page
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 ml-2"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default notFound;
