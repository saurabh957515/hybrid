/** @format */

import { Fragment, useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/20/solid";

export default function Notifications({ status, description, setStateFlash }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShow(false);
      setStateFlash({});
    }, 3000);
    setShow(true);
  }, []);

  return (
    <>
      {/* Global notification live region, render this permanently at the end of the document */}
      <div
        aria-live="assertive"
        className="xs:mx6px pointer-events-none fixed z-50 flex w-full items-end py-6 drop-shadow-md max-sm:top-12 max-sm:right-0.5 max-sm:left-0.5 sm:top-0 sm:right-0 sm:mt-12 sm:items-start sm:p-6"
      >
        <div className="sm:items-end flex flex-col items-center w-full space-y-4">
          {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
          <Transition
            show={show}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="ring-1 ring-black ring-opacity-5 w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-lg pointer-events-auto">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    {status === "success" ? (
                      <CheckCircleIcon
                        className="w-6 h-6 text-green-400"
                        aria-hidden="true"
                      />
                    ) : (
                      <ExclamationTriangleIcon
                        className="w-6 h-6 text-red-600"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-sm font-medium text-gray-900 capitalize">
                      {status}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">{description}</p>
                  </div>
                  <div className="flex flex-shrink-0 ml-4">
                    <button
                      type="button"
                      className="hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 inline-flex text-gray-400 bg-white rounded-md"
                      onClick={() => {
                        setShow(false);
                        setStateFlash({});
                      }}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="w-5 h-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  );
}
