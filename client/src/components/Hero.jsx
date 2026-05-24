import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="min-h-[90vh] flex items-center justify-center px-6">
      <div className=" pl-5 max-w-6xl grid md:grid-cols-2 gap-12 items-center">
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className=" text-5xl md:text-7xl font-bold leading-tight">
            Connect With
            <span className="text-indigo-500"> Developers</span>
          </h1>

          <p className="text-gray-400 mt-6 text-lg leading-relaxed">
            Share your ideas, showcase projects, and build your developer
            network.
          </p>

          <div className="flex gap-4 mt-8">
            <Link to="/register">
              <button className="px-6 py-3 bg-indigo-600 rounded-2xl">
                Get Started
              </button>
            </Link>

            <Link to="/feed">
              <button className="px-6 py-3 border border-white/20 rounded-2xl">
                Explore
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
