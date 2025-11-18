import React, { useState, useEffect } from "react";
import Xarrow from "react-xarrows";

export default function TestArrow({mousePos}) {
    return (<div
    id="mouse-target"
    style={{
      position: "absolute",
      left: mousePos.x,
      top: mousePos.y,
      width: 1,
      height: 1,
      pointerEvents: "none",
    }}
  />
  );
}