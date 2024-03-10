import { useEffect, useState } from "react";
import { Document, Page } from "react-pdf";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import TextInput from "./Fileds/TextInput";
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import classNames from "./Helper";

export default function PdfComp() {
  const location = useLocation();
  const { state } = location;
  const [pdfFile, setPdfFile] = useState(String);
  const [numPages, setNumPages] = useState("000");
  const [pageNumber, setPageNumber] = useState(1);
  const [books, setBooks] = useState([]);
  const [searchOptions, setSearchOptions] = useState({});
  const [SideBarOpen, setSideBarOpen] = useState(false);
  const [pageWidth, setPageWidth] = useState("");

  async function getData() {
    const data = await axios.get(
      "/book",
      {
        params: searchOptions,
      },
      {
        params: {},
      }
    );
    setBooks(data?.data?.books);
  }
  useEffect(() => {
    getData();
    setPdfFile(state?.bookData);
  }, [searchOptions]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (state) {
  //       const data = await axios.get(
  //         `${process.env.PUBLIC_URL}/${state?.bookData}`
  //       );
  //       setPdfFile(data?.data);
  //     }
  //   };
  //   fetchData();
  // }, [state]);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    // setNumPages(numPages);
    // setPageNumber(numPages)
  }

  function bookToRead(book) {
    setPdfFile(book);
  }

  return (
    <div className="flex flex-col h-full p-6 overflow-hidden rounded-lg shadow-lg dark:bg-gray-800">
      <div className="text-center text-gray-600 ">
        Page{" "}
        <input
          onChange={(e) => setPageNumber(e.target.value)}
          value={pageNumber}
          className="w-[25px] mx-2"
        ></input>{" "}
        of {numPages}
      </div>
      <div className="flex w-full p-5 space-x-4 border rounded grow">
        <div
          className={classNames(
            "flex justify-center w-3/4 h-full duration-1000  transition-all bg-[#D9D9D9]",
            !SideBarOpen && "w-full"
          )}
        >
          {pdfFile ? (
            <Document
              className="h-[75vh] overflow-auto "
              file={`${process.env.PUBLIC_URL}/${pdfFile}`}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              {Array?.apply(null, Array(numPages))
                .map((x, i) => i + 1)
                .map((page) => (
                  <Page
                    width={pageWidth}
                    onPageChange={({ pageNumber }) => console.log(pageNumber)}
                    key={page}
                    pageNumber={page}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    className="mb-4 "
                  />
                ))}
            </Document>
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
                className="p-2 border rounded cursor-pointer "
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
