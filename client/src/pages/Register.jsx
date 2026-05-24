import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData,
      );

      alert(res.data.message);

      navigate("/login");
    } catch (error) {
   alert(error.response?.data?.message || "Register failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
      <div className="w-[400px] bg-slate-800 p-8 rounded-2xl">
        <h1 className="text-3xl font-bold mb-6">Register</h1>
        <p className="text-gray-400 mb-6 leading-relaxed">
          Join DevConnect and share your ideas with developers around the world
          🚀
        </p>
        <p className="text-gray-400 mb-6">
          Back to{" "}
          <span
            className="text-indigo-400 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Home
          </span>
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-slate-700 outline-none"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-slate-700 outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-slate-700 outline-none"
          />

          <button type="submit" className="w-full bg-indigo-600 p-3 rounded-xl">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
