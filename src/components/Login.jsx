import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import shareVideo from "../assets/share.mp4";
import logo from "../assets/logowhite.png";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import axios from "axios";

import { client } from "../client";

function Login() {
  const navigate = useNavigate();
  const user = false;

  const createOrGetUser = async (response, addUSer) => {
    console.log(response.credential);
    const decoded = jwt_decode(response.credential);
    console.log(decoded);
    localStorage.setItem('user', JSON.stringify(decoded));
    const { name, picture, sub, aud } = decoded;
    const user = {
      _id: sub,
      _type: "user",
      userName: name,
      image: picture,
      googleId: aud
    };
    client.createIfNotExists(user).then(() => {
      navigate("/", { replace: true });
    });
  };

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full ">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />

        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width="130px" alt="logo" />
          </div>
          <div className="shadow-2xl">
            {user ? (
              <div>Logged In </div>
            ) : (
              <GoogleLogin
                onSuccess={(response) => createOrGetUser(response)}
                onError={() => console.log("Error")}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
