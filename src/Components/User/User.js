import React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./User.css";
import { useNavigate } from "react-router-dom";

export default function User() {
  const location = useLocation();
  const { userID } = location.state || {};
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    setUserData(null);
    if (!userID) return;
    fetch("/Datas.json")
      .then((res) => res.json())
      .then((data) => {
        const selectedUser = data.find((user) => user.id === userID);

        setUserData(selectedUser);
      });
  }, [userID]);
  const postHandler = (postId) => {
    navigate("/Onlypost", { state: { postID: postId } });
  };
  return (
    <>
      {!userData ? (
        <h1>loading...</h1>
      ) : (
        <div className="user-info">
          <div className="user-info_wrapper">
            <img src={userData.avatar} alt="avatar" />
            <div className="user-info_wrapper__desc">
              <span className="user-info_wrapper__username">
                {userData.username}
              </span>
              <span className="user-info_wrapper__bio">{userData.bio}</span>
            </div>
          </div>
          <button className="follow-btn">Follow</button>
          <div className="posts-section">
            {userData.posts.map((post) => (
              <img
                key={post.id}
                src={post.image}
                alt="post"
                onClick={() => postHandler(post.id)}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
