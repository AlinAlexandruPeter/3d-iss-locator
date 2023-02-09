import loadingIllustration from "../assets/loading-illustration.png";
import "animate.css";

export default function Loading() {
  return (
    <div className="loading animate__animated">
      <img src={loadingIllustration} alt="Loading..." />
      <h1>getting our telescopes ready...</h1>
      <p>
        if this takes more than a few seconds
        <button onClick={() => location.reload()}>reload</button>
      </p>
    </div>
  );
}
