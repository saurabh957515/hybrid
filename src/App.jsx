import React from "react";
import Layout from "./Components/Layout";

function App({ children }) {
  return (
    <div className="bg-blue-500 w-full h-full">
      <Layout className="w-full h-full"/>
    </div>
  );
}

export default App;
