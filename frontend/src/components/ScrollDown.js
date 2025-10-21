import React from "react";
import Lottie from "lottie-react";
import scrollDown from "./scroll-down.json"; // ✅ cleaner import

const ScrollDown = () => {
  return (
    <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-2 z-50">
        <p className="text-white/100 text-base font-medium tracking-wide">Scroll Down</p>
      <div className="w-10 h-10 opacity-90">
        <Lottie animationData={scrollDown} loop autoplay />
      </div>
    </div>
  );
};

export default ScrollDown;
