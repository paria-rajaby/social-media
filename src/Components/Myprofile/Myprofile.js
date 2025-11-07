import React from "react";
import { Link } from "react-router-dom";
import "./Myprofile.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function Myprofile() {
  const [myInfos, setMyInfos] = useState({});
  const [myPosts, setMyPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + "/Datas.json")
      .then((res) => res.json())
      .then((data) => {
        const myAccountInfos = data.find((user) => user.id === 5);
        const myAccountPosts = myAccountInfos.posts.map((post) => ({
          ...post,
        }));
        setMyInfos(myAccountInfos);
        setMyPosts(myAccountPosts);
      });
  }, []);

  const postHandler = (postId) => {
    navigate("/Onlypost", { state: { postID: postId } });
  };
  return (
    <>
      {!myInfos ? (
        <p>loading ...</p>
      ) : (
        <div className="user-info">
          <div className="user-info_wrapper">
            {myInfos.avatar ? (
              <img src={myInfos.avatar} alt="avatar" />
            ) : (
              <img src="./images/nopic.jpg" alt="avatar" />
            )}

            <div className="user-info_wrapper__desc">
              <span className="user-info_wrapper__username">
                {myInfos.username}
              </span>
              <span className="user-info_wrapper__bio">{myInfos.bio}</span>
            </div>
          </div>
          <div className="buttons-wrapper">
            <button className="buttons-wrapper_btn">Add Post</button>
            <button className="buttons-wrapper_btn">Edit profile</button>
          </div>
          <div className="posts-section">
            {myPosts.length === 0 ? (
              <p>no post uploded !!</p>
            ) : (
              myPosts.map((post) => (
                <img
                  key={post.id}
                  src={post.image}
                  alt="post"
                  onClick={() => postHandler(post.id)}
                />
              ))
            )}
            {}
          </div>
        </div>
      )}
    </>
  );
}
