import { useState } from "react";

export const Item = () => {
  let [clicked, setClicked] = useState(false);
  return (
    <div onClick={() => setClicked(!clicked)}>
      {clicked ? "Clicked!" : "Hello, click me"}
    </div>
  );
};
