import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

export default function Footer() {
  return (
    <>
      <div className="footer">
        <Link to={"/"}>
          <HomeOutlinedIcon style={{ width: 40, height: 40, color: "black" }} />
        </Link>
        <Link to={"/Myprofile"}>
          <PersonOutlineOutlinedIcon
            style={{ width: 40, height: 40, color: "black" }}
          />
        </Link>
      </div>
    </>
  );
}
