import { useState } from "react";
import YouTube from "react-youtube";
import VideoLoading from "./VideoLoading";
import "animate.css";

export default function Camera(props) {
  const { handleClick } = props;
  const [loading, setLoading] = useState(true);

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const liveISSID = "4_OT4xFrjmM";
  let options = {
    height: isMobile ? "240px" : "300px",
    width: isMobile ? "350px" : "500px",
    playerVars: {
      autoplay: 1,
    },
  };

  const videoReady = () => {
    document.querySelector(".no-display").classList.remove("no-display");
    setLoading(false);
  };

  return (
    <div className="camera animate__animated animate__fadeInDown animate__faster">
      <section>
        <h1>
          <a href="https://youtube.com/live/86YLFOog4GM?si=EnSIkaIECMiOmarE">
            ISS Live Camera{" "}
            <i className="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
        </h1>
        {loading && <VideoLoading />}
        <YouTube
          videoId={liveISSID}
          opts={options}
          onReady={videoReady}
          className="no-display"
        />
        <button onClick={handleClick}>
          <i className="fa-solid fa-xmark"></i>
        </button>
      </section>
    </div>
  );
}
