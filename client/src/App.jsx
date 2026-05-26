import { useState, useEffect } from "react";
import "./App.css";
import io from "socket.io-client";

import {
  FaHome,
  FaSearch,
  FaHeart,
  FaPlusSquare,
  FaBars,
  FaUserCircle,
} from "react-icons/fa";

const socket =
  io("http://localhost:5000");


function App() {

  // LOGIN

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // PAGES

  const [activePage, setActivePage] = useState("home");

  // AUTH

  const [signupUsername, setSignupUsername] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // PROFILE

  const [bio, setBio] = useState("");

  const [profilePic, setProfilePic] = useState(null);

  // SEARCH

  const [searchText, setSearchText] = useState("");

  // FOLLOW SYSTEM

  const [followers, setFollowers] = useState(0);

  const [following] = useState(0);

  const [isFollowing, setIsFollowing] = useState(false);

  // POSTS

  const [postImage, setPostImage] = useState(null);

  const [caption, setCaption] = useState("");

  const [posts, setPosts] = useState([]);

  const [message, setMessage] =
    useState("");

  const [chat, setChat] =
    useState([]);

  // USERS

  const [allUsers, setAllUsers] = useState([]);

  const [selectedUser, setSelectedUser] =
    useState(null);


  // SIGNUP

  const handleSignup = () => {

    if (
      !signupUsername ||
      !signupEmail ||
      !signupPassword
    ) {
      return alert("Fill all fields");
    }

    alert("Signup Successful 🔥");
  };

  // LOGIN

  const handleLogin = () => {

    if (!loginEmail || !loginPassword) {
      return alert("Enter login details");
    }

    localStorage.setItem(
      "token",
      "loggedIn"
    );

    setIsLoggedIn(true);

    alert(`Welcome ${signupUsername} 🔥`);
  };

  // CREATE POST

  const createPost = () => {

    if (!postImage || !caption) {
      return alert("Add image and caption");
    }

    const newPost = {

      image:
        URL.createObjectURL(postImage),

      caption,

      likes: 0,

      liked: false,

      comments: [],
    };

    setPosts([newPost, ...posts]);

    setCaption("");

    setPostImage(null);

    alert("Post Uploaded 🚀");
  };

  useEffect(() => {

    const token =
      localStorage.getItem("token");

    if (token) {

      setIsLoggedIn(true);

    }

  }, []);

  // SEARCH USERS
  useEffect(() => {

    fetchUsers();

  }, []);

  useEffect(() => {

    socket.on(

      "receive_message",

      (data) => {

        setChat((prev) => [

          ...prev,

          data

        ]);

      }

    );

  }, []);






  const fetchUsers = async () => {

    try {

      const response = await fetch(
        "http://localhost:5000/api/auth/users"
      );

      const data = await response.json();

      setAllUsers(data);

    } catch (error) {

      console.log(error);

    }

  };

  const filteredUsers =
    allUsers.filter((user) =>
      user.username
        .toLowerCase()
        .includes(searchText.toLowerCase())
    );

  // LOGIN PAGE

  if (!isLoggedIn) {

    return (

      <div className="auth-container">

        <div className="left-auth">

          <h1>GoSocial🔥</h1>

          <p>
            Build your own social media world.
          </p>

        </div>

        <div className="right-auth">

          <div className="auth-box">

            <h2>Signup</h2>

            <input
              type="text"
              placeholder="Username"
              onChange={(e) =>
                setSignupUsername(e.target.value)
              }
            />

            <input
              type="email"
              placeholder="Email"
              onChange={(e) =>
                setSignupEmail(e.target.value)
              }
            />

            <input
              type="password"
              placeholder="Password"
              onChange={(e) =>
                setSignupPassword(e.target.value)
              }
            />

            <button onClick={handleSignup}>
              Signup
            </button>

            <hr />

            <h2>Login</h2>

            <input
              type="email"
              placeholder="Email"
              onChange={(e) =>
                setLoginEmail(e.target.value)
              }
            />

            <input
              type="password"
              placeholder="Password"
              onChange={(e) =>
                setLoginPassword(e.target.value)
              }
            />

            <button onClick={handleLogin}>
              Login
            </button>

          </div>

        </div>

      </div>

    );
  }

  // MAIN APP

  return (

    <div className="app">

      {/* SIDEBAR */}

      <div className="sidebar">

        <h1 className="logo">
          GoSocial
        </h1>

        <div
          className="menu-item"
          onClick={() => setActivePage("home")}
        >
          <FaHome />
          <span>Home</span>
        </div>

        <div
          className="menu-item"
          onClick={() => setActivePage("search")}
        >
          <FaSearch />
          <span>Search</span>
        </div>

        <div
          className="menu-item"
          onClick={() => setActivePage("create")}
        >
          <FaPlusSquare />
          <span>Create</span>
        </div>

        <div
          className="menu-item"
          onClick={() => setActivePage("chat")}
        >
          💬
          <span>Chats</span>
        </div>

        <div className="menu-item">
          <FaHeart />
          <span>Notifications</span>
        </div>

        <div
          className="menu-item"
          onClick={() => setActivePage("profile")}
        >
          <FaUserCircle />
          <span>Account</span>
        </div>

        <div
          className="menu-item"
          onClick={() => {

            localStorage.removeItem("token");

            setIsLoggedIn(false);

          }}
        >
          <FaBars />
          <span>Logout</span>
        </div>

      </div>
      {/* MAIN */}

      <div className="main-content">

        {/* HOME */}

        {activePage === "home" && (

          <div>

            <h1 className="page-title">
              Welcome {signupUsername} 👋
            </h1>

            <div className="posts-grid">

              {posts.map((post, index) => (

                <div className="post-card" key={index}>

                  {/* TOP */}

                  <div className="post-top">

                    <div className="post-user">

                      <img
                        src={
                          profilePic
                            ?
                            URL.createObjectURL(profilePic)
                            :
                            "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        }

                        alt=""

                        className="small-pic"
                      />

                      <div>

                        <h4>{signupUsername}</h4>

                        <p className="time-text">
                          Just now
                        </p>

                      </div>

                    </div>

                    <button
                      className="delete-btn"

                      onClick={() => {

                        const updatedPosts =
                          posts.filter((_, i) =>
                            i !== index
                          );

                        setPosts(updatedPosts);

                      }}
                    >
                      Delete
                    </button>

                  </div>

                  {/* IMAGE */}

                  <img
                    src={post.image}
                    alt=""
                    className="post-image"
                  />

                  {/* ACTIONS */}

                  <div className="post-actions">

                    <button
                      className="action-btn"

                      onClick={() => {

                        const updatedPosts =
                          [...posts];

                        updatedPosts[index].liked =
                          !updatedPosts[index].liked;

                        if (
                          updatedPosts[index].liked
                        ) {

                          updatedPosts[index].likes += 1;

                        } else {

                          updatedPosts[index].likes -= 1;
                        }

                        setPosts(updatedPosts);

                      }}
                    >
                      {post.liked
                        ?
                        "❤️ Liked"
                        :
                        "🤍 Like"
                      }
                    </button>

                    <button
                      className="action-btn"

                      onClick={() => {

                        const comment =
                          prompt("Enter Comment");

                        if (comment) {

                          const updatedPosts =
                            [...posts];

                          updatedPosts[index]
                            .comments
                            .push(comment);

                          setPosts(updatedPosts);
                        }

                      }}
                    >
                      💬 Comment
                    </button>

                  </div>

                  <p className="like-count">
                    ❤️ {post.likes} likes
                  </p>

                  <p className="caption">
                    <b>{signupUsername}</b> {post.caption}
                  </p>

                  {/* COMMENTS */}

                  <div className="comments-section">

                    {post.comments.map((comment, i) => (

                      <p
                        key={i}
                        className="comment"
                      >
                        <b>{signupUsername}</b> {comment}
                      </p>

                    ))}

                  </div>

                </div>

              ))}

            </div>

          </div>

        )}

        {/* SEARCH */}

        {activePage === "search" && (

          <div className="search-page">

            <h1 className="page-title">
              Search Users 🔍
            </h1>

            <input
              type="text"
              className="search-input"
              placeholder="Search username..."
              value={searchText}
              onChange={(e) =>
                setSearchText(e.target.value)
              }
            />

            <div className="search-results">

              {filteredUsers.map((user, index) => (

                <div
                  className="user-card"

                  onClick={() => {

                    setSelectedUser(user);

                    setActivePage("userProfile");

                  }}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    alt=""
                  />

                  <h3>{user.username}</h3>

                  <button
                    className="follow-btn"

                    onClick={() => {

                      if (isFollowing) {

                        setFollowers(followers - 1);

                      } else {

                        setFollowers(followers + 1);
                      }

                      setIsFollowing(!isFollowing);

                    }}
                  >
                    {
                      isFollowing
                        ?
                        "Following"
                        :
                        "Follow"
                    }
                  </button>

                </div>

              ))}

            </div>

          </div>

        )}

        {/* CREATE */}

        {activePage === "create" && (

          <div className="create-post">

            <h1 className="page-title">
              Create Post 🚀
            </h1>

            <input
              type="file"
              onChange={(e) =>
                setPostImage(e.target.files[0])
              }
            />

            <textarea
              placeholder="Write caption..."
              value={caption}
              onChange={(e) =>
                setCaption(e.target.value)
              }
            />

            <button onClick={createPost}>
              Upload Post
            </button>

          </div>

        )}


        {/* CHAT PAGE */}

        {activePage === "chat" && (

          <div className="chat-page">

            <h1 className="page-title">
              Real Time Chat 💬
            </h1>

            <div className="chat-box">

              <div className="messages">

                {chat.map((msg, index) => (

                  <div
                    className="message"
                    key={index}
                  >
                    {msg}
                  </div>

                ))}

              </div>

              <div className="chat-input-area">

                <input

                  type="text"

                  placeholder="Type message..."

                  value={message}

                  onChange={(e) =>
                    setMessage(e.target.value)
                  }
                />

                <button

                  onClick={() => {

                    socket.emit(
                      "send_message",
                      message
                    );

                    setMessage("");

                  }}
                >
                  Send
                </button>

              </div>

            </div>

          </div>

        )}





        {/* PROFILE */}

        {activePage === "profile" && (

          <div className="profile-page">

            <div className="profile-header">

              <label htmlFor="profileInput">

                <img
                  src={
                    profilePic
                      ?
                      URL.createObjectURL(profilePic)
                      :
                      "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }

                  alt=""

                  className="profile-pic"
                />

              </label>

              <input
                type="file"
                hidden
                id="profileInput"

                onChange={(e) =>
                  setProfilePic(e.target.files[0])
                }
              />

              <div className="profile-info">

                <div className="top-row">

                  <h2>{signupUsername}</h2>

                  <div className="profile-buttons">

                    <button>
                      Edit Profile
                    </button>

                    <button
                      className="follow-btn"

                      onClick={async () => {

                        try {

                          const response = await fetch(
                            "http://localhost:5000/api/follow/follow",
                            {
                              method: "PUT",

                              headers: {
                                "Content-Type": "application/json",
                              },

                              body: JSON.stringify({

                                currentUserId:
                                  "6a142fb5003d6d5e36272a12",

                                targetUserId:
                                  "6a14266311c55649dd1736d9",

                              }),
                            }
                          );

                          const data =
                            await response.json();

                          console.log(data);

                          if (isFollowing) {

                            setFollowers(followers - 1);

                          } else {

                            setFollowers(followers + 1);
                          }

                          setIsFollowing(!isFollowing);

                        } catch (error) {

                          console.log(error);

                        }

                      }}
                    >
                      {
                        isFollowing
                          ?
                          "Following"
                          :
                          "Follow"
                      }
                    </button>

                  </div>

                </div>

                <div className="stats">

                  <span>
                    <b>{posts.length}</b> posts
                  </span>

                  <span>
                    <b>{followers}</b> followers
                  </span>

                  <span>
                    <b>{following}</b> following
                  </span>

                </div>

                <textarea
                  className="bio-input"
                  placeholder="Write your bio..."
                  value={bio}
                  onChange={(e) =>
                    setBio(e.target.value)
                  }
                />

                <p className="bio-text">
                  {bio}
                </p>

              </div>

            </div>

            {/* PROFILE POSTS */}

            <div className="posts-grid">

              {posts.map((post, index) => (

                <div
                  className="post-card"
                  key={index}
                >

                  <img
                    src={post.image}
                    alt=""
                    className="post-image"
                  />

                </div>

              ))}

            </div>

          </div>

        )}


        {/* USER PROFILE PAGE */}

        {
          activePage === "userProfile" &&
          selectedUser && (

            <div className="profile-page">

              <button
                className="back-btn"
                onClick={() =>
                  setActivePage("search")
                }
              >
                ← Back
              </button>

              <div className="profile-header">

                <img
                  src={
                    selectedUser.profilePic
                      ?
                      selectedUser.profilePic
                      :
                      "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }

                  alt=""

                  className="profile-pic"
                />

                <div className="profile-info">

                  <div className="top-row">

                    <h2>
                      {selectedUser.username}
                    </h2>

                    <button

                      className="follow-btn"

                      onClick={() => {

                        if (isFollowing) {

                          setFollowers(
                            followers - 1
                          );

                        } else {

                          setFollowers(
                            followers + 1
                          );

                        }

                        setIsFollowing(
                          !isFollowing
                        );

                      }}
                    >

                      {
                        isFollowing
                          ?
                          "Following"
                          :
                          "Follow"
                      }

                    </button>

                  </div>

                  <div className="stats">

                    <span>

                      <b>
                        {
                          (
                            selectedUser.posts || []
                          ).length
                        }
                      </b>

                      posts

                    </span>

                    <span>

                      <b>
                        {followers}
                      </b>

                      followers

                    </span>

                    <span>

                      <b>
                        {
                          (
                            selectedUser.following || []
                          ).length
                        }
                      </b>

                      following

                    </span>

                  </div>

                  <p className="bio-text">

                    {
                      selectedUser.bio
                        ?
                        selectedUser.bio
                        :
                        "No bio yet 🚀"
                    }

                  </p>

                </div>

              </div>

            </div>

          )
        }








      </div>

    </div>

  );
}




export default App;