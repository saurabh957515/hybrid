import { ClockIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import classNames from "../Helper";

function Home() {
  const [timer, setTimer] = useState(0);
  const [isReading, setIsReading] = useState(false);
  useEffect(() => {
    let intervalId;
    if (isReading) {
      intervalId = setInterval(() => {
        setTimer((pre) => pre + 1);
      }, [1000]);
    }
    return () => clearInterval(intervalId);
  }, [isReading]);
  return (
    <div className="w-full p-5 border">
      <div onClick={() => setIsReading(!isReading)}>
        <div className={classNames(isReading?"bg-red-500":"bg-green-500","w-52 p-4 text-white rounded flex justify-between cursor-default")}>
          
         {isReading?"End Timer":"StartTimer"}
        <ClockIcon className="w-5 h-5 "/>
        </div>
        {timer}
        
        </div>
    </div>
  );
}

export default Home;
