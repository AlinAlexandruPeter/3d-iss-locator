import { useState } from "react";
import YouTube from "react-youtube";
import VideoLoading from "./VideoLoading";

export default function Camera(props) {
  const { handleClick } = props;
  const [loading, setLoading] = useState(true);

  const liveISSURL = "86YLFOog4GM";
  let options = {
    height: "300px",
    width: "500px",
    playerVars: {
      autoplay: 1,
      alowFullScreen: 0,
    },
  };

  const videoReady = () => {
    document.querySelector(".no-display").classList.remove("no-display");
    setLoading(false);
  };

  return (
    <div className="camera">
      <section>
        <h1>
          <a href="https://youtube.com/live/86YLFOog4GM?si=EnSIkaIECMiOmarE">
            ISS Live Camera{" "}
            <i className="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
        </h1>
        {loading && <VideoLoading />}
        <YouTube
          videoId={liveISSURL}
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
