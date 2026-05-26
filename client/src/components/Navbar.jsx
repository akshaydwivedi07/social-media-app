import {
  FaHome,
  FaSearch,
  FaCompass,
  FaHeart,
  FaPlusSquare,
  FaBars,
} from "react-icons/fa";

function Navbar() {
  return (
    <div className="sidebar">

      <h1 className="instaLogo">Instagram</h1>

      <div className="menu">

        <div className="menuItem active">
          <FaHome />
          <span>Home</span>
        </div>

        <div className="menuItem">
          <FaSearch />
          <span>Search</span>
        </div>

        <div className="menuItem">
          <FaCompass />
          <span>Explore</span>
        </div>

        <div className="menuItem">
          <FaHeart />
          <span>Notifications</span>
        </div>

        <div className="menuItem">
          <FaPlusSquare />
          <span>Create</span>
        </div>

      </div>

      <div className="moreBtn">
        <FaBars />
        <span>More</span>
      </div>

    </div>
  );
}

export default Navbar;