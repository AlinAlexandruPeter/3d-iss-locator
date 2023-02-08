import "./App.css";
import { useState } from "react";
import Header from "./components/Header";
import Loading from "./components/Loading";
import Camera from "./components/Camera";
import Footer from "./components/Footer";

function App() {
  const [cameraOn, setCameraOn] = useState(false);
  const handleClick = () => {
    document.querySelector(".camera").classList.add("animate__fadeOutUp");
    setCameraOn((prevCameraOn) => !prevCameraOn);
  };

  return (
    <div className="App">
      <Loading />
      <Header handleClick={handleClick} />
      {cameraOn && <Camera handleClick={handleClick} />}
      <Footer />
    </div>
  );
}

export default App;
