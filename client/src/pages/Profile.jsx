import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [username, setUsername] = useState(storedUser.username || "");
  const [bio, setBio] = useState(storedUser.bio || "");

  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `https://devconnect-pxxq.onrender.com/api/auth/profile/${storedUser._id}`,
        {
          username,
          bio,
        },
      );

      localStorage.setItem("user", JSON.stringify(res.data));

      alert("Profile updated successfully 🚀");

      navigate("/feed");
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-slate-800 p-8 rounded-3xl shadow-2xl">
        <h1 className="text-3xl font-bold mb-2">Edit Profile</h1>

        <p className="text-gray-400 mb-6">Update your developer profile 🚀</p>

        <Link
          to="/feed"
          className="text-indigo-400 hover:text-indigo-300 transition"
        >
          ← Back to Feed
        </Link>

        <div className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 rounded-xl bg-slate-700 outline-none"
          />

          <textarea
            placeholder="Write your bio..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows="4"
            className="w-full p-3 rounded-xl bg-slate-700 outline-none resize-none"
          />

          <button
            onClick={handleUpdate}
            className="w-full bg-indigo-600 hover:bg-indigo-500 transition p-3 rounded-xl font-semibold"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
