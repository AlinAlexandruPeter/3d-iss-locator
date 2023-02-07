import loadingIllustration from "../assets/loading-illustration.png";
import "animate.css";

export default function Loading() {
  return (
    <div className="loading animate__animated">
      <img src={loadingIllustration} alt="Loading..." />
      <h1>getting our satelites ready...</h1>
    </div>
  );
}
