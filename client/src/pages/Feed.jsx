import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Feed = () => {
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");

  const user = storedUser ? JSON.parse(storedUser) : null;

  const [posts, setPosts] = useState([]);

  const [text, setText] = useState("");

  const [commentText, setCommentText] = useState("");

  const [comments, setComments] = useState({});

  // FETCH POSTS
  const fetchPosts = async () => {
    try {
      const res = await axios.get(
        "https://devconnect-pxxq.onrender.com/api/posts",
      );

      setPosts(res.data);

      // fetch comments for every post
      res.data.forEach((post) => {
        fetchComments(post._id);
      });
    } catch (error) {
      console.log(error);
    }
  };

  // FETCH COMMENTS
  const fetchComments = async (postId) => {
    try {
      const res = await axios.get(
        `https://devconnect-pxxq.onrender.com/api/comments/${postId}`,
      );

      setComments((prev) => ({
        ...prev,
        [postId]: res.data,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* NAVBAR */}
      <nav className="border-b border-white/10 px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-500">DevConnect</h1>

        <div className="flex gap-3">
          <Link to="/profile">
            <button className="bg-indigo-600 px-5 py-2 rounded-xl">
              {user?.username}
            </button>
          </Link>

          <button
            className="bg-red-500 px-5 py-2 rounded-xl"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");

              navigate("/login");
            }}
          >
            Logout
          </button>
        </div>
      </nav>

      {/* FEED */}
      <div className="max-w-2xl mx-auto py-10 px-4">
        {/* CREATE POST */}
        <div className="bg-slate-800 p-5 rounded-2xl mb-6">
          <textarea
            placeholder="What's on your mind?"
            className="w-full bg-slate-700 p-4 rounded-xl outline-none resize-none"
            rows="4"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <button
            className="mt-4 bg-indigo-600 px-5 py-2 rounded-xl"
            onClick={async () => {
              if (!text) return;

              try {
                const newPost = {
                  author: user.username,
                  content: text,
                };

                await axios.post(
                  "https://devconnect-pxxq.onrender.com/api/posts",
                  newPost,
                );

                setText("");

                fetchPosts();
              } catch (error) {
                console.log(error);
              }
            }}
          >
            Post
          </button>
        </div>

        {/* POSTS */}
        <div className="space-y-5">
          {posts.map((post) => (
            <div key={post._id} className="bg-slate-800 p-5 rounded-2xl">
              {/* USER */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-indigo-500"></div>

                <div>
                  <h3 className="font-bold">{post.author}</h3>

                  <p className="text-gray-400 text-sm">Just now</p>
                </div>
              </div>

              {/* CONTENT */}
              <p className="text-gray-200 leading-relaxed">{post.content}</p>

              {/* ACTIONS */}
              <div className="flex gap-6 mt-5 text-gray-400">
                {/* LIKE */}
                <button
                  onClick={async () => {
                    try {
                      await axios.put(
                        `https://devconnect-pxxq.onrender.com/api/posts/${post._id}/like`,
                      );

                      fetchPosts();
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                >
                  ❤️ {post.likes}
                </button>
              </div>

              {/* COMMENT INPUT */}
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Write a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="w-full p-2 rounded-lg bg-slate-700 outline-none"
                />

                <button
                  className="mt-2 bg-indigo-600 px-4 py-2 rounded-lg"
                  onClick={async () => {
                    if(!commentText.trim()) return;
                    try {
                      await axios.post(
                        "https://devconnect-pxxq.onrender.com/api/comments",
                        {
                          postId: post._id,
                          author: user.username,
                          text: commentText,
                        },
                      );

                      setCommentText("");

                      fetchComments(post._id);
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                >
                  Comment
                </button>
              </div>

              {/* COMMENTS */}
              <div className="mt-4 space-y-2">
                {comments[post._id]?.map((comment) => (
                  <div
                    key={comment._id}
                    className="bg-slate-700 p-3 rounded-lg"
                  >
                    <p className="font-bold text-sm">{comment.author}</p>

                    <p className="text-gray-300">{comment.text}</p>
                  </div>
                ))}
              </div>

              {/* DELETE */}
              <button
                className="text-red-400 mt-4"
                onClick={async () => {
                  try {
                    await axios.delete(
                      `https://devconnect-pxxq.onrender.com/api/posts/${post._id}`,
                    );

                    fetchPosts();
                  } catch (error) {
                    console.log(error);
                  }
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feed;
