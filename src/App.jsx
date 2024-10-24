import { useState } from "react";
import Landing from "./components/Landing";
import CanvasContainer from "./components/CanvasContainer";
import Navbar from "./components/Navbar";
import TextLayer from "./components/TextLayer";

function App() {
  
  return (
    <>
      <main className="orbitron">
        <Navbar />
        <Landing />
        {/* <TextLayer/> */}
        <CanvasContainer />
      </main>
    </>
  );
}

export default App;
