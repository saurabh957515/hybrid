import { Fragment, useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import TextInput from "./Fileds/TextInput";
import {
  Bars3CenterLeftIcon,
  EllipsisHorizontalIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import classNames, { storedToken } from "./Helper";
import { Viewer, SpecialZoomLevel, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { Menu, Transition } from "@headlessui/react";

export default function PdfComp() {
  const location = useLocation();
  const { state } = location;
  const viewerRef = useRef(1);
  const [pdfFile, setPdfFile] = useState(String);
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [books, setBooks] = useState([]);
  const [searchOptions, setSearchOptions] = useState({});
  const [SideBarOpen, setSideBarOpen] = useState(false);

  async function getData() {
    const data = await axios.get("api/book", {
      params: searchOptions,
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    });
    setBooks(data?.data?.books);
  }

  useEffect(() => {
    getData();
    setPdfFile(state?.bookData);
  }, [searchOptions]);

  const handlePageChange = ({ currentPage, doc }) => {
    setPageNumber(currentPage + 1);
    setNumPages(doc?._pdfInfo?.numPages);
  };

  const goToPage = (pageNumber) => {
    if (viewerRef.current && pageNumber >= 1 && pageNumber <= totalPages) {
      viewerRef.current.scrollToPage(pageNumber);
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="flex flex-col h-full sm:p-6 overflow-hidden rounded-lg shadow-lg dark:bg-gray-800">
      {pdfFile && (
        <div className="text-center dark:text-white text-gray-600 sm:mt-0 my-2">
          {`Page  ${pageNumber} of ${numPages}`}
        </div>
      )}
      <div className="flex sm:flex-row flex-col-reverse w-full p-5 sm:space-x-4 border dark:border-gray-500 rounded grow">
        <div
          className={classNames(
            "flex mt-4 sm:mt-0 justify-center w-full grow sm:h-[80vh] h-auto duration-1000 transition-all bg-[#D9D9D9]",
            !SideBarOpen && "sm:w-full"
          )}
        >
          {pdfFile ? (
            <Viewer
              fileUrl={`/api/${pdfFile}`}
              defaultScale={SpecialZoomLevel.PageFit}
              onPageChange={(e) => {
                handlePageChange(e);
              }}
              ref={(instance) => {
                viewerRef.current = instance;
                if (typeof ref === "function") {
                  ref(instance);
                } else if (ref) {
                  ref.current = instance;
                }
              }}
            />
          ) : (
            <div className="">"No Book to show......"</div>
          )}
        </div>
        <div className={classNames("h-1 bg-blue-300", !SideBarOpen ? "hidden" : "")}></div>
        <div
          className={classNames(
            "sm:p-3 pb-3 rounded duration-1000  transition-all w-full dark:border-gray-500",
            SideBarOpen ? "sm:w-96 sm:border " : "sm:w-16 "
          )}
        >
          <div className="flex items-center ">
            <div
              onClick={() => setSideBarOpen(!SideBarOpen)}
              className="p-1.5 rounded mr-2 border dark:border-gray-500 "
            >
              <Bars3CenterLeftIcon className="w-5 h-5 dark:text-white " />
            </div>
            <div
              className={classNames(
                "relative pt-2 text-gray-600 grow l-4 sm:ml-0",
                !SideBarOpen && "hidden"
              )}
            >
              <TextInput
                value={searchOptions?.title}
                handleChange={(e) =>
                  setSearchOptions((pre) => ({
                    ...pre,
                    title: e.target.value,
                  }))
                }
                className="h-10 px-5 pr-16 border-gray-300 dark:border-gray-500 rounded-lg dark:text-white  dark:bg-gray-800 border-1 focus:outline-none"
                type="search"
                placeholder="Search"
              />
              <button
                type="submit"
                className="absolute top-0 right-0 mt-5 mr-4"
              >
                <MagnifyingGlassIcon
                  onClick={(e) => {
                    getData();
                  }}
                  className="w-5 h-5 dark:text-white dark:opacity-80"
                />
              </button>
            </div>
          </div>

          <div className={classNames("space-y-4 sm:border-none border-1 dark:border-gray-500 overflow-auto sm:h-full h-40 scrollbar-hide duration-1000 transition-all", !SideBarOpen && "hidden  ")}>
            {books?.map((book) => (
              <div
                onClick={() => setPdfFile(book?.book)}
                key={book?._id}
                className={classNames(
                  "p-2 border dark:border-gray-500 rounded cursor-pointer flex items-center justify-between ",
                  book?.book === pdfFile ? "bg-gray-200 dark:bg-white" : ""
                )}
              >
                <div>
                  <div className="font-medium text-blue-500">{book?.title}</div>
                  <div className="font-normal text-gray-500">
                    sdfsd{book?.description}
                  </div>
                </div>

                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex text-sm  rounded-full">
                      <span className="sr-only">Open user menu</span>
                      <EllipsisHorizontalIcon className="h-7 w-7 " />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-500"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href={`/api/${book?.book}`}
                            target="blank"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 shadow text-sm text-gray-700"
                            )}
                          >
                            Open In NewTab
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>



              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
