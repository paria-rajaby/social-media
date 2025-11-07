import React from "react";
import "./Mainpage.css";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function Mainpage() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedPosts = localStorage.getItem("posts");

    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      fetch(`${window.location.origin}/social-media/Datas.json`)
        .then((res) => res.json())
        .then((data) => {
          const allPosts = data.flatMap((user) =>
            user.posts.map((post) => ({
              ...post,
              userId: user.id,
              username: user.username,
              avatar: user.avatar.startsWith("/social-media")
                ? user.avatar
                : process.env.PUBLIC_URL + user.avatar,
              image: post.image.startsWith("/social-media")
                ? post.image
                : process.env.PUBLIC_URL + post.image,
            }))
          );
          setPosts(allPosts);
          localStorage.setItem("posts", JSON.stringify(allPosts));
        });
    }
  }, []);
  const postLikeHandler = (postId) => {
    setPosts((prevPost) => {
      const updatedPosts = prevPost.map((post) =>
        post.id === postId
          ? {
              ...post,
              isliked: !post.isliked,
              likecount: post.isliked ? post.likecount - 1 : post.likecount + 1,
            }
          : post
      );
      localStorage.setItem("posts", JSON.stringify(updatedPosts));
      return updatedPosts;
    });
  };
  const checkUserProfileHandler = (userId) => {
    navigate("/User", { state: { userID: userId } });
  };

  return (
    <div>
      {posts.length === 0 ? (
        <p>loading....</p>
      ) : (
        posts.map((post) => (
          <div key={post.id}>
            <div className="post">
              <div className="post-top_bar">
                <div className="post-top_bar__wrapper">
                  <img
                    src={post.avatar}
                    alt="avatar"
                    className="avatar"
                    onClick={() => checkUserProfileHandler(post.userId)}
                  />
                  <span onClick={() => checkUserProfileHandler(post.userId)}>
                    {post.username}
                  </span>
                </div>
              </div>
              <div className="post-image">
                <img src={post.image} alt="post" />
              </div>
              <div className="post-infos">
                <div className="post-infos_likes">
                  <button
                    className="like-btn"
                    onClick={() => postLikeHandler(post.id)}
                  >
                    {post.isliked ? (
                      <FavoriteIcon style={{ color: "red" }}></FavoriteIcon>
                    ) : (
                      <FavoriteBorderOutlinedIcon></FavoriteBorderOutlinedIcon>
                    )}
                  </button>
                  <span>{post.likecount}</span>
                </div>
                <div className="post-infos_caption">{post.caption}</div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
