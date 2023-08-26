import React, { useContext } from "react";
import { MapContext } from "../App";

export default function Footer() {
  const { time, cords } = useContext(MapContext);

  return (
    <div>
      <p className="text-center">Page Updates in {time} Seconds</p>
      <div>
        <ul>
          {cords.map(({ lat, lng }, index) => (
            <li key={index}>
              {lat},{lng}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
