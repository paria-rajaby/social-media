import React from "react";
import "./Onlypost.css";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";

export default function Onlypost() {
  const location = useLocation();
  const [post, setPost] = useState(null);
  const { postID } = location.state || {};
  const navigate = useNavigate();
  useEffect(() => {
    fetch("/Datas.json")
      .then((res) => res.json())
      .then((data) => {
        const allPosts = data.flatMap((user) =>
          user.posts.map((post) => ({
            ...post,
            userId: user.id,
            username: user.username,
            avatar: user.avatar,
          }))
        );

        let selectedPost = allPosts.find((p) => p.id === postID);
        console.log(selectedPost);

        const likedPosts = JSON.parse(localStorage.getItem("likedPosts")) || {};
        if (likedPosts[postID]) {
          selectedPost = likedPosts[postID];
        }

        setPost(selectedPost);
      });
  }, [postID]);
  const postLikeHandler = (postID) => {
    setPost((prevPost) => {
      if (!prevPost) return prevPost;

      const updatedPost = {
        ...prevPost,
        isliked: !prevPost.isliked,
        likecount: prevPost.isliked
          ? prevPost.likecount - 1
          : prevPost.likecount + 1,
      };

      const likedPosts = JSON.parse(localStorage.getItem("likedPosts")) || {};
      likedPosts[postID] = updatedPost;
      localStorage.setItem("likedPosts", JSON.stringify(likedPosts));

      return updatedPost;
    });
  };
  const checkUserProfileHandler = (userId) => {
    navigate("/User", { state: { userID: userId } });
  };
  return (
    <>
      {!post ? (
        <p>loading</p>
      ) : (
        <div key={post.id} className="post">
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
      )}
    </>
  );
}
