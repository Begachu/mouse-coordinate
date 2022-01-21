import React from "react";
import { Pannellum } from "pannellum-react";

const Panorama = ({ img, yawPitch }) => {
  return (
    <div>
      <Pannellum
        width="100%"
        height="500px"
        image={img}
        pitch={yawPitch[1]}
        yaw={yawPitch[0] + 180}
        hfov={110}
        autoLoad
        onLoad={() => {
          console.log("panorama loaded");
        }}
        hotspotDebug={true}
      >
        <Pannellum.Hotspot
          type="custom"
          pitch={yawPitch[1]}
          yaw={yawPitch[0] + 180}
          text="Info Hotspot Text 4"
        />
      </Pannellum>
    </div>
  );
};

export default Panorama;
