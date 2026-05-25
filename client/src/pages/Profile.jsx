import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");

  const user = storedUser ? JSON.parse(storedUser) : null;

  const [posts, setPosts] = useState([]);

  const [editing, setEditing] = useState(false);

  const [bio, setBio] = useState(user?.bio || "");

  const [username, setUsername] = useState(user?.username || "");

  // FETCH USER POSTS
  const fetchUserPosts = async () => {
    try {
      const res = await axios.get(
        "https://devconnect-pxxq.onrender.com/api/posts",
      );

      const userPosts = res.data.filter(
        (post) => post.author === user?.username,
      );

      setPosts(userPosts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserPosts();
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* NAVBAR */}
      <nav className="border-b border-white/10 px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-500">DevConnect</h1>

        <Link
          to="/feed"
          className="text-indigo-400 hover:text-indigo-300 transition"
        >
          Back to Feed
        </Link>
      </nav>

      {/* PROFILE */}
      <div className="max-w-3xl mx-auto py-10 px-4">
        <div className="bg-slate-800 rounded-2xl p-8">
          {/* TOP */}
          <div className="flex items-center gap-6">
            {/* AVATAR */}
            <div className="w-24 h-24 rounded-full bg-indigo-500"></div>

            <div>
              <h1 className="text-3xl font-bold">{user?.username}</h1>

              <p className="text-gray-400 mt-2">{user?.email}</p>

              <p className="text-gray-300 mt-2">{user?.bio || "No bio yet"}</p>

              <div className="flex gap-6 mt-4">
                <div>
                  <span className="font-bold">{posts.length}</span> Posts
                </div>
              </div>
            </div>
          </div>

          {/* EDIT BUTTON */}
          <button
            className="mt-5 bg-indigo-600 px-5 py-2 rounded-xl"
            onClick={() => setEditing(!editing)}
          >
            Edit Profile
          </button>

          {/* EDIT FORM */}
          {editing && (
            <div className="mt-8 space-y-4">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-700 outline-none"
              />

              <textarea
                placeholder="Bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-700 outline-none"
              />

              <button
                className="bg-green-600 px-5 py-2 rounded-xl"
                onClick={async () => {
                  try {
                    const res = await axios.put(
                      `https://devconnect-pxxq.onrender.com/api/auth/profile/${user._id}`,
                      {
                        username,
                        bio,
                      },
                    );

                    localStorage.setItem("user", JSON.stringify(res.data));

                    alert("Profile updated 🚀");

                    navigate("/feed");
                  } catch (error) {
                    console.log(error);

                    alert(error.response?.data?.message || "Update failed");
                  }
                }}
              >
                Save
              </button>
            </div>
          )}

          {/* POSTS */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-5">My Posts</h2>

            <div className="space-y-4">
              {posts.map((post) => (
                <div key={post._id} className="bg-slate-700 p-4 rounded-xl">
                  <p>{post.content}</p>

                  <div className="mt-3 flex items-center gap-2 text-gray-400">
                    ❤️ <span>{post.likes}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
