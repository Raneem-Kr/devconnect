import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [username, setUsername] = useState(storedUser.username);
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
    <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
      <div className="bg-slate-800 p-8 rounded-2xl w-[400px]">
        <h1 className="text-3xl font-bold mb-6">Edit Profile</h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 rounded-xl bg-slate-700 outline-none mb-4"
        />

        <textarea
          placeholder="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full p-3 rounded-xl bg-slate-700 outline-none mb-4 resize-none"
          rows="4"
        />

        <button
          onClick={handleUpdate}
          className="w-full bg-indigo-600 p-3 rounded-xl"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Profile;
