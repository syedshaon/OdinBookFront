import { useDispatch, useSelector } from "react-redux";
import { IoPersonSharp } from "react-icons/io5";
import { MdPeopleAlt } from "react-icons/md";
import { FaFacebookMessenger } from "react-icons/fa";

const LeftBar = () => {
  const authState = useSelector((state) => state.auth);
  return (
    <div className="w-1/5 pt-16 h-[90vh] hidden xl:flex flex-col justify-between fixed top-0 left-0">
      <ul className="p-4 list-none ">
        <li>
          <a href="#" className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-lg no-underline transition-all text-gray-600">
            {authState.user.profilePicture ? <img src="./images/tuat.jpg" alt="Profile picture" className="w-10 h-10 rounded-full" /> : <IoPersonSharp className="text-4xl" />}

            <span className="font-semibold">
              {authState.user.firstName} {authState.user.lastName}
            </span>
          </a>
        </li>
        <li>
          <a href="#" className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-lg no-underline transition-all text-gray-600">
            <MdPeopleAlt className="text-4xl" />
            <span className="font-semibold">Friends</span>
          </a>
        </li>
        <li>
          <a href="#" className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-lg no-underline transition-all text-gray-600">
            <FaFacebookMessenger className="text-4xl" />
            <span className="font-semibold">Messages</span>
          </a>
        </li>
      </ul>

      <div className="  p-6 text-sm text-gray-500">
        <a className="text-gray-600" href="#">
          Privacy
        </a>
        <span>.</span>
        <a className="text-gray-600" href="#">
          Terms
        </a>
        <span>.</span>
        <a className="text-gray-600" href="#">
          Advertising
        </a>
        <span>.</span>
        <a className="text-gray-600" href="#">
          Cookies
        </a>
        <span>.</span>
        <a className="text-gray-600" href="#">
          Ad choices
        </a>
        <span>.</span>
        <a className="text-gray-600" href="#">
          More
        </a>
        <span>.</span>
        <span>OdinBook © till 3020</span>
      </div>
    </div>
  );
};

export default LeftBar;
