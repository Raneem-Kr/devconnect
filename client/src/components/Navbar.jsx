import { FaCode } from "react-icons/fa";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="w-full flex items-center justify-between px-8 py-5 border-b border-white/10 backdrop-blur-md">
      <div className="flex items-center gap-2">
        <FaCode className="text-indigo-500 text-2xl" />

        <h1 className="text-2xl font-bold">DevConnect</h1>
      </div>

      <div className="flex items-center gap-4">
        <Link to="/login">
          <button className="px-5 py-2 rounded-xl border border-white/20">
            Login
          </button>
        </Link>
        <Link to="/register">
          <button className="px-5 py-2 rounded-xl bg-indigo-600">
            Register
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
