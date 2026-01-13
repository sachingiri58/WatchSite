import React, { useEffect, useRef } from "react";
import { bannerHomeStyles } from "../assets/dummyStyles";
import video from "../assets/bannervideo.mp4";
import Navbar from "./Navbar";

const BannerHome = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    // MUST for autoplay
    v.muted = true;
    v.playsInline = true;
    v.loop = true;

    // Try autoplay first
    const playPromise = v.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay blocked → wait for user interaction
      });
    }

    // 🔥 Browser-proof fallback
    const forcePlay = () => {
      v.play().catch(() => {});
      window.removeEventListener("click", forcePlay);
      window.removeEventListener("scroll", forcePlay);
      window.removeEventListener("touchstart", forcePlay);
    };

    window.addEventListener("click", forcePlay);
    window.addEventListener("scroll", forcePlay);
    window.addEventListener("touchstart", forcePlay);

    return () => {
      window.removeEventListener("click", forcePlay);
      window.removeEventListener("scroll", forcePlay);
      window.removeEventListener("touchstart", forcePlay);
    };
  }, []);

  return (
    <div className={bannerHomeStyles.container}>
      <Navbar />

      <div className={bannerHomeStyles.videoContainer}>
        <video
          ref={videoRef}
          className={bannerHomeStyles.video}
          muted
          autoPlay
          playsInline
          preload="auto"
        >
          <source src={video} type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default BannerHome;
