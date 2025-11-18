import React, { useRef, useEffect, useState } from "react";

export default function Arrow() {
  const startRef = useRef(null);
  const endRef = useRef(null);
  const [arrowCoords, setArrowCoords] = useState(null);

  useEffect(() => {
    const updateArrow = () => {
      const start = startRef.current.getBoundingClientRect();
      const end = endRef.current.getBoundingClientRect();

      setArrowCoords({
        x1: start.left + start.width / 2,
        y1: start.top + start.height / 2,
        x2: end.left + end.width / 2,
        y2: end.top + end.height / 2,
      });
    };

    updateArrow();
    window.addEventListener("resize", updateArrow);
    return () => window.removeEventListener("resize", updateArrow);
  }, []);

  return (
    <div>
      
      {arrowCoords && (
        <svg
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            pointerEvents: "none",
            width: "100vw",
            height: "100vh",
          }}
        >
          <line
            x1={arrowCoords.x1}
            y1={arrowCoords.y1}
            x2={arrowCoords.x2}
            y2={arrowCoords.y2}
            stroke="black"
            strokeWidth="2"
            markerEnd="url(#arrowhead)"
          />
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="0"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill="black" />
            </marker>
          </defs>
        </svg>
      )}
    </div>
  );
}