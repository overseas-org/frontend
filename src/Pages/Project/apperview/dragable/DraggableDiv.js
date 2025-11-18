import React, { useState } from 'react';

function DraggableDiv({ id, object, position, setPosition, updatePosition, onClick }) {
  // const [position, setPosition] = useState({ x: 100, y: 100 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState(null);

  const handleMouseDown = (e) => {
    setStartPos({ x: e.clientX, y: e.clientY });
    setDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    }
  };

  const handleMouseUp = (e) => {
    updatePosition()
    setDragging(false);
    if (startPos) {
      const dx = Math.abs(e.clientX - startPos.x);
      const dy = Math.abs(e.clientY - startPos.y);
      if (dx < 5 && dy < 5) {
        onClick(); // it's a click, not a drag
      }
    }
  };

  return (
    <div>
      {position && <div
        onMouseDown={handleMouseDown}
        style={{
          position: 'absolute',
          left: position.x,
          top: position.y,
          width: '150px',
          height: '150px',
          cursor: 'pointer',
          userSelect: 'none',
        }}
      >
        {object}
        {/* Attach move and up listeners to the whole document */}
        {dragging && (
          <div
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              cursor: 'pointer',
            }}
          />
        )}
      </div> }
    </div>
  );
}

export default DraggableDiv;