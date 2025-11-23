import React from "react";
import Lottie from "lottie-react";
import scrollDown from "./scroll-down.json"; // ✅ cleaner import

const ScrollDown = () => {
  return (
    <div className="flex flex-col items-center space-y-2">
        <p className="text-white/100 text-base font-medium tracking-wide">Scroll Down</p>
      <div className="w-10 h-10 opacity-90">
        <Lottie animationData={scrollDown} loop autoplay />
      </div>
    </div>
  );
};

export default ScrollDown;
