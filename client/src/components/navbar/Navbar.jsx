import { Link } from "react-router-dom";
import { GrPrevious } from "react-icons/gr";

const Navbar = ({ iconBack, iconBackLink }) => {
  return (
    <nav className="w-full h-16 z-30 bg-base-200-light text-base-content flex items-center justify-between shadow-md px-6 md:px-8 lg:px-12">
      {/* back icon */}
      {iconBack && (
        <Link
          to={iconBackLink}
          className="flex items-center justify-center gap-2 text-nowrap text-2xl"
        >
          <GrPrevious />
        </Link>
      )}
      {/* Logo  */}
      <div className="text-lg font-bold">
        <Link
          to="/"
          className="flex items-center justify-center gap-2 text-nowrap text-2xl"
        >
          <span>Silicosis Risk</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
