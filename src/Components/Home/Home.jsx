import { BookOpenIcon, ClockIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import classNames from "../Helper";
import TextInput from "../Fileds/TextInput";
import { toast } from "react-toastify";
import moment from "moment";
import { getRoute } from "../../UseApi";

function Home() {
  const [timer, setTimer] = useState(0);
  const [isReading, setIsReading] = useState(false);
  const [bookNote, setBookNote] = useState("");
  const [counter, setCounter] = useState(false);
  const [isLoader, setIsLoader] = useState(true);
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

  const getTime = (time) => {
    const data = getRoute("/api/readbook/time", {
      time: timer,
      note: bookNote,
      date: moment(),
      isTimerOn: time,
    }).then((res) => {
      if (res.data) {
        setIsReading(res?.data?.isTimerOn);
        setTimer(res?.data?.timer);
        setIsLoader(false);
        setBookNote("");
      } else {
        console.error(error);
      }
    });
  };

  useEffect(() => {
    getTime();
  }, []);

  function formatTime(seconds) {
    const duration = moment.duration(seconds, "seconds");
    return moment.utc(duration.asMilliseconds()).format("HH:mm:ss");
  }
  return (
    <div className="w-full sm:p-5 dark:text-white">
      <div className=" px-2 border dark:border-gray-500 rounded sm:w-96 w-60 sm:mt-0 mt-2 sm:ml-0 ml-4">
        <div className="flex items-center justify-between p-4 text-base font-medium capitalize dark:border-gray-500 border-b">
          <span>Book ReadingTime</span>
          <span>
            <BookOpenIcon className="w-5 h-5" />
          </span>
        </div>
        <div
          className={classNames(
            "p-4 text-white rounded flex justify-between cursor-default dark:border-gray-500 border-b items-center space-x-2"
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
              isLoader
                ? "bg-[#2080df]"
                : isReading
                  ? "bg-red-500"
                  : "bg-green-500",
              "w-2/4 p-2 rounded cursor-pointer -mt-2.5 flex justify-between items-center"
            )}
          >
            {isLoader ? (
              <div className="mx-auto text-white loader" />
            ) : (
              <>
                {isReading ? "End Timer" : "StartTimer"}
                <ClockIcon className="w-5 h-5 " />
              </>
            )}
          </div>
        </div>
        <div className={classNames("flex p-4  h-28 w-full")}>
          <span
            className={classNames(
              "m-auto transition-all duration-1000",
              isLoader ? "hidden" : ""
            )}
          >
            Reading Time : {formatTime(timer)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Home;
