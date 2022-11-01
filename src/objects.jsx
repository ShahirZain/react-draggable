import React from "react";
import { useDrag } from "react-dnd";
export const ItemTypes = {
  KNIGHT: "knight",
};

const style = {
  position: "absolute",
  border: "1px dashed gray",
  backgroundColor: "white",
  padding: "0.5rem 1rem",
  cursor: "move",
};

export const Box = ({ id, left, top, hideSourceOnDrag, children }) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.KNIGHT,
      item: { id, left, top },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, left, top]
  );

  if (isDragging && hideSourceOnDrag) {
    return <div ref={drag} />;
  }
  return (
    <div
      className="box"
      ref={drag}
      style={{ ...style, left, top, borderRadius: "50%" }}
      data-testid="box"
    >
      {children}
    </div>
  );
};
