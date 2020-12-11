// import { useState } from "react";
import Images from "./components/Images";
import "./assets/css/style.css";

function App() {
  // const [title, setTitle] = useState("Hello React!!!")

  return (
    <section className="flex justify-center bg-gray-300">
      <div className="w-10/12 bg-gray-200">
        <div className="text-center bg-gray-100">
          <Images />
        </div>
      </div>
    </section>
  );
}

export default App;
