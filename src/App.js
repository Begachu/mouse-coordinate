import { useState } from "react";
import "./App.css";
import Panorama from "./Components/Panorama";

function App() {
  // STATE
  const [img, setImg] = useState(null);
  const [XY, setXY] = useState([0, 0]);
  const [YawPitch, setYawPitch] = useState([283.75, -5.83]);

  // EVENT
  const onUpload = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onMouseMove = (e) => {
    const { width, height } = e.target;
    const x = e.nativeEvent.offsetX / width;
    const y = e.nativeEvent.offsetY / height;
    setXY([x, y]);
  };

  const onMouseUp = (e) => {
    convertXYtoYawPitch();
  };

  const convertXYtoYawPitch = () => {
    const yaw = XY[0] * 360;
    const pitch = (XY[1] - 0.5) * -180;
    setYawPitch([yaw, pitch]);
  };

  // RETURN
  return (
    <div className="App">
      {/* input file button */}
      <input
        type="file"
        accept="image/jpeg, image/jpg, image/png"
        onChange={onUpload}
      />

      {/* coordinate(relative, percent) */}
      <p>{`x : ${(XY[0] * 100).toFixed(2)}%  y : ${(XY[1] * 100).toFixed(
        2
      )}%`}</p>
      <p>{`yaw : ${YawPitch[0].toFixed(2)}
      pitch : ${YawPitch[1].toFixed(2)}`}</p>

      {/* image */}
      <div id="img-container">
        <img
          src={img}
          alt={`선택한 사진`}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
        />
      </div>

      {/* pannellum */}
      {img ? <Panorama img={img} yawPitch={YawPitch} /> : null}
    </div>
  );
}

export default App;
