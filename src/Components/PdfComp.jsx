import { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import TextInput from "./Fileds/TextInput";
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import classNames, { storedToken } from "./Helper";
import { Viewer, SpecialZoomLevel, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

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
    if (numPages === 0) {
      setNumPages(doc?._pdfInfo?.numPages);
    }
  };

  const goToPage = (pageNumber) => {
    if (viewerRef.current && pageNumber >= 1 && pageNumber <= totalPages) {
      viewerRef.current.scrollToPage(pageNumber);
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="flex flex-col h-full p-6 overflow-hidden rounded-lg shadow-lg dark:bg-gray-800">
      {pdfFile && (
        <div className="text-center text-gray-600 ">
          Page
          <input
            onChange={(e) => setPageNumber(e.target.value)}
            value={pageNumber}
            className="w-[20px]   ml-2 bg-[#F9F9F9]"
          ></input>
          of {numPages}
        </div>
      )}
      <div className="flex w-full p-5 space-x-4 border rounded grow">
        <div
          className={classNames(
            "flex justify-center w-3/4 h-full duration-1000  transition-all bg-[#D9D9D9]",
            !SideBarOpen && "w-full"
          )}
        >
          {pdfFile ? (
            <div style={{ height: "750px", width: "800px" }}>
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
            </div>
          ) : (
            <div className="">"No Book to show......"</div>
          )}
        </div>
        <div
          className={classNames(
            "p-3   rounded duration-1000  transition-all ",
            SideBarOpen ? "w-96 border" : "w-16 "
          )}
        >
          <div className="flex items-center ">
            <div
              onClick={() => setSideBarOpen(!SideBarOpen)}
              className="p-1.5 rounded mr-2 border "
            >
              <Bars3CenterLeftIcon className="w-5 h-5" />
            </div>
            <div
              className={classNames(
                "relative pt-2 text-gray-600 grow",
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
                className="h-10 px-5 pr-16 border-gray-300 rounded-lg dark:text-white C dark:border-white dark:bg-gray-800 border-1 focus:outline-none"
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

          <div className={classNames("space-y-4", !SideBarOpen && "hidden  ")}>
            {books?.map((book) => (
              <div
                onClick={() => setPdfFile(book?.book)}
                key={book?._id}
                className={classNames(
                  "p-2 border rounded cursor-pointer",
                  book?.book === pdfFile ? "bg-gray-200" : ""
                )}
              >
                <div className="font-medium text-blue-500">{book?.title}</div>
                <div className="font-normal text-gray-500">
                  {book?.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
