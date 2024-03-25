import { BookOpenIcon, ClockIcon } from "@heroicons/react/24/outline";
import React, { useContext, useEffect, useState } from "react";
import classNames, { FlashContext, storedToken } from "../Helper";
import axios from "axios";
import TextInput from "../Fileds/TextInput";
import { toast } from "react-toastify";
import moment from "moment";

function Home() {
  const [timer, setTimer] = useState(0);
  const [isReading, setIsReading] = useState(false);
  const [bookNote, setBookNote] = useState("");
  const [counter, setCounter] = useState(false);
  useEffect(() => {
    let intervalId;
    if (counter) {
      if (isReading) {
        toast.success("Timer started  !", {});
      } else {
        toast.warning("Timer Ended !", {});
      }
    }

    if (isReading) {
      intervalId = setInterval(() => {
        setTimer((pre) => pre + 1);
      }, [1000]);
      setCounter(true);
    }
    return () => clearInterval(intervalId);
  }, [isReading]);

  const getTime = async (time) => {
    try {
      const timerData = await axios.get("/readbook/time", {
        params: {
          time: timer,
          note: bookNote,
          date: moment(),
          isTimerOn: time,
        },
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });
      setIsReading(timerData?.data?.isTimerOn);
      setTimer(timerData?.data?.timer);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTime();
  }, []);

  function formatTime(seconds) {
    const duration = moment.duration(seconds, "seconds");
    return moment.utc(duration.asMilliseconds()).format("HH:mm:ss");
  }
  return (
    <div className="w-full p-5 ">
      <div className="items-center px-2 border rounded w-96">
        <div className="flex items-center justify-between p-4 text-base font-medium capitalize border-b">
          <span>Book ReadingTime</span>

          <span>
            <BookOpenIcon className="w-5 h-5" />
          </span>
        </div>
        <div
          className={classNames(
            "p-4 text-white rounded flex justify-between cursor-default border-b items-center space-x-2"
          )}
        >
          <TextInput
            handleChange={(e) => {
              setBookNote(e.target.value);
            }}
            value={bookNote}
            placeholder="Add Note"
            className="w-12 py-2"
          />
          <div
            onClick={(e) => {
              getTime(!isReading);
              setIsReading(!isReading);
            }}
            className={classNames(
              isReading ? "bg-red-500" : "bg-green-500",
              "w-2/4 p-2 rounded cursor-pointer -mt-2.5 flex justify-between items-center"
            )}
          >
            {isReading ? "End Timer" : "StartTimer"}
            <ClockIcon className="w-5 h-5 " />
          </div>
        </div>
        <div className="flex p-4 h-28">
          <span className="m-auto">Reading Time : {formatTime(timer)}</span>
        </div>
      </div>
    </div>
  );
}

export default Home;
