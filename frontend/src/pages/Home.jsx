import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { TypeAnimation } from "react-type-animation";
import backgroundImage from "/banner.jpg";
import backgroundImage2 from "/banner2.jpg";

export default function Home() {
  return (
    <div
      className="relative w-full h-[calc(100vh-120px)] flex bg-cover bg-center text-gray-700"
      style={{ backgroundImage: `url(${backgroundImage2})` }}
    >
      {/* Background Overlay (Optional for better readability) */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Left Side - Full Height & 1/4 Width Translucent Card */}
      <div className="relative z-10 w-1/4 h-full bg-white bg-opacity-30 backdrop-blur-lg p-8 flex flex-col justify-center shadow-lg">
        {/* <h1 className="text-3xl font-bold text-white">
          Welcome to the Deepseek Portal
        </h1> */}
        <TypeAnimation className=" text-white"
          sequence={[
            "Welcome to the DeepSEEK Portal",
            1000, // Waits 1s
            "",
            () => {
              console.log("Sequence completed");
            },
          ]}
          wrapper="span"
          cursor={true}
          repeat={Infinity}
          style={{ fontSize: "3.5em", display: "inline-block" , fontFamily: "sans-serif"}}
        />
        <Link to={`/authenticate`}>
          <Button className="mt-6 px-6 py-3 btn-color text-3xl p-7">
            Join Us
          </Button>
        </Link>
      </div>
    </div>
  );
}
