import "./App.css";
import { Box } from "./objects";
import { useDrop } from "react-dnd";
import { ItemTypes } from "./objects";
import { useState, useCallback } from "react";
import update from "immutability-helper";

function App({ hideSourceOnDrag }) {
  const [boxes, setBoxes] = useState({
    a: { top: 0, left: 0, title: "A" },
    b: { top: 0, left: 50, title: "B" },
  });
  console.log("🚀 ~ file: Exampl.js ~ line 16 ~ App ~ boxes", boxes["b"]);
  const moveBox = useCallback(
    (id, left, top) => {
      setBoxes(
        update(boxes, {
          [id]: {
            $merge: { left, top },
          },
        })
      );
    },
    [boxes, setBoxes]
  );
  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.KNIGHT,
      drop(item, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset();
        console.log("🚀 ~ file: Exampl.js ~ line 34 ~ drop ~ delta", delta);
        const left = Math.round(item.left + delta.x);
        const top = Math.round(item.top + delta.y);
        moveBox(item.id, left, top);
        return undefined;
      },
    }),
    [moveBox]
  );

  return (
    <div
      style={{
        width: "800px",
        height: "700px",
        // borderRadius: "50%",
        border: "1px solid black",
        // margin: "50px",
        display: "flex",
        alignItems: "center",
        textAlign: "center",
        margin: "0 auto",
        justifyContent: "center",
        // backgroundColor: "black",
      }}
    >
      <span>zoneA</span>

      <div
        ref={drop}
        id={"zoneA"}
        style={{
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          border: "1px solid black",
          justifyContent: "center",

          display: "flex",
          alignItems: "center",
          textAlign: "center",
          background: "#4bc475",
        }}
      >
        <div
          ref={drop}
          id={"zoneB"}
          style={{
            width: "450px",
            height: "450px",
            borderRadius: "100%",
            border: "1px solid black",
            justifyContent: "center",

            background: "#a1a1a1",
            display: "flex",
            alignItems: "center",
            textAlign: "center",
            position: "relative",
          }}
        >
          {Object.keys(boxes).map((key) => {
            const { left, top, title } = boxes[key];
            return (
              <Box
                key={key}
                id={key}
                left={left}
                top={top}
                hideSourceOnDrag={hideSourceOnDrag}
              >
                {title}
              </Box>
            );
          })}
          <span>zoneB</span>
          <div ref={drop} style={{ ...styles, margin: "0 auto" }} id={"zoneC"}>
            zoneC
          </div>
        </div>
      </div>
    </div>
  );
}
const styles = {
  width: 300,
  height: 300,
  border: "1px solid black",
  // position: "relative",
  borderRadius: "50%",
  margin: "0 auto",
  background: "#a1a1a1",
  display: "flex",
  alignItems: "center",
  textAlign: "center",
  background: "grey",
};
export default App;
